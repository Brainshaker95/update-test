const dotenv = require('dotenv');
const {
  contextBridge,
  ipcRenderer,
  shell,
  webFrame,
} = require('electron');

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 42069;

const ZOOM_FACTOR_SCALE = 0.1;
const MIN_ZOOM_FACTOR = 0.1;
const MAX_ZOOM_FACTOR = 2;

const host = process.env.APP_HOST ?? DEFAULT_HOST;
const port = process.env.APP_PORT ?? DEFAULT_PORT;

dotenv.config();
webFrame.setZoomFactor(1);

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

/**
 * @param {number} deltaZoom
 * @returns {void}
 */
const adjustZoom = (deltaZoom) => {
  webFrame.setZoomFactor(clamp(MIN_ZOOM_FACTOR, webFrame.getZoomFactor() + deltaZoom, MAX_ZOOM_FACTOR));
};

window.addEventListener('keydown', (event) => {
  if (!event.ctrlKey || (event.key !== '+' && event.key !== '-' && event.key !== '0')) {
    return;
  }

  event.preventDefault();

  if (event.key === '0') {
    webFrame.setZoomFactor(1);
  } else {
    adjustZoom(event.key === '+' ? ZOOM_FACTOR_SCALE : -ZOOM_FACTOR_SCALE);
  }
});

window.addEventListener('wheel', (event) => {
  if (!event.ctrlKey) {
    return;
  }

  adjustZoom(ZOOM_FACTOR_SCALE * (-event.deltaY / 100));
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'F11') {
    return;
  }

  if (document.fullscreenElement === document.documentElement) {
    document.exitFullscreen().catch(() => {});
  } else {
    document.documentElement.requestFullscreen().catch(() => {});
  }
});

document.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLElement) || !event.target.closest('a')) {
    return;
  }

  const link = event.target.closest('a');

  if (!link?.href
    || link.href.startsWith('#')
    || link.href.startsWith(`http://${host}:${port}`)) {
    return;
  }

  event.preventDefault();

  shell
    .openExternal(link.href)
    .catch(console.error);
});

contextBridge.exposeInMainWorld('electron', {
  /**
   * @param {string} channel
   * @param {unknown[]} args
   */
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  },

  /**
   * @param {string} channel
   * @param {unknown[]} args
   */
  sendSync: (channel, ...args) => {
    ipcRenderer.sendSync(channel, ...args);
  },

  /**
   * @param {string} channel
   * @param {(...args: unknown[]) => void} listener
   */
  on: (channel, listener) => {
    /**
    * @param {Electron.IpcRendererEvent} event
    * @param {...unknown} args
    */
    const callback = (event, ...args) => listener(event, ...args);

    ipcRenderer.on(channel, callback);
  },
});
