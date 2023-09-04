const { fork } = require('child_process');
const path = require('path');

const dotenv = require('dotenv');
const {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  ipcMain,
} = require('electron');
const contextMenu = require('electron-context-menu');
const windowStateKeeper = require('electron-window-state');

const handleUpdate = require('./update.cjs');

dotenv.config();

const FORCE_DEV_TOOLS = true;
const DEFAULT_WINDOW_WIDTH = 1600;
const DEFAULT_WINDOW_HEIGHT = 900;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 42069;
const RETRY_DELAY = 200;

const host = process.env.APP_HOST ?? DEFAULT_HOST;
const port = process.env.APP_PORT ?? DEFAULT_PORT;
const isDev = !app.isPackaged;

/**
 * @type {import('electron').BrowserWindow | null}
 */
let mainWindow = null;

if (isDev) {
  try {
    // module has to be loaded like this
    // eslint-disable-next-line global-require
    require('electron-reloader')(module, {
      // @ts-expect-error - property is wrongly marked as readonly
      ignore: './tmp',
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @type {Record<string, Record<string, string> | undefined>}
 */
const contextMenuLabels = {
  en: {
    copy: 'Copy',
    copyImage: 'Copy Image',
    cut: 'Cut',
    inspect: 'Inspect',
    paste: 'Paste',
    saveImage: 'Save Image',
    saveImageAs: 'Image Image As…',
    selectAll: 'Select all',
  },
  de: {
    copy: 'Kopieren',
    copyImage: 'Bild kopieren',
    cut: 'Ausschneiden',
    inspect: 'Untersuchen',
    paste: 'Einfügen',
    saveImage: 'Bild speichern',
    saveImageAs: 'Bild speichern unter…',
    selectAll: 'Alles auswählen',
  },
};

/**
 * @type {import('child_process').ChildProcess | null}
 */
let nodeServer = null;

const forceDevTools = () => FORCE_DEV_TOOLS;

const loadUrl = () => {
  if (!mainWindow) {
    throw new Error('Unreachable');
  }

  mainWindow
    .loadURL(`http://${host}:${port}`)
    .catch(() => setTimeout(loadUrl, RETRY_DELAY));
};

const startNodeServer = () => fork('resources/app/index.js', {
  env: {
    HOST: host,
    PORT: String(port),
    BODY_SIZE_LIMIT: '100000000',
  },
});

const createMainWindow = () => {
  const windowState = windowStateKeeper({
    defaultWidth: DEFAULT_WINDOW_WIDTH,
    defaultHeight: DEFAULT_WINDOW_HEIGHT,
  });

  mainWindow = new BrowserWindow({
    title: 'Update Test',
    backgroundColor: '#1e1e1e',
    minHeight: 450,
    minWidth: 320,
    webPreferences: {
      nodeIntegration: true,
      spellcheck: false,
      devTools: forceDevTools() || isDev,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    x: isDev ? undefined : windowState.x,
    y: isDev ? undefined : windowState.y,
    width: isDev ? DEFAULT_WINDOW_WIDTH : windowState.width,
    height: isDev ? DEFAULT_WINDOW_HEIGHT : windowState.height,
    show: false,
  });

  const disposeContextMenu = contextMenu({
    showCopyLink: false,
    showLearnSpelling: false,
    showLookUpSelection: false,
    showSearchWithGoogle: false,
    showSaveImage: true,
    showSaveImageAs: true,
    showCopyImage: true,
    labels: contextMenuLabels[app.getLocale()] ?? contextMenuLabels.en,
  });

  windowState.manage(mainWindow);
  mainWindow.removeMenu();

  mainWindow
    .once('ready-to-show', () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();

        if (forceDevTools()) {
          mainWindow.webContents.openDevTools();
        } else if (!isDev) {
          mainWindow.webContents.on('devtools-opened', () => {
            mainWindow?.webContents.closeDevTools();
          });
        }
      }
    })
    .on('close', () => {
      if (mainWindow) {
        windowState.saveState(mainWindow);
      }

      disposeContextMenu();

      mainWindow = null;
    });

  if (isDev) {
    loadUrl();

    return;
  }

  if (!nodeServer) {
    try {
      nodeServer = startNodeServer();
    } catch {
      dialog.showErrorBox(
        'Failed starting node server',
        'Make sure to install Node.js (https://nodejs.org/)',
      );

      mainWindow.close();

      return;
    }
  }

  loadUrl();
};

ipcMain
  .on('handshake', (event, handshake) => mainWindow?.webContents.send('handshake', handshake))
  .on('handle-update', () => {
    if (!isDev && mainWindow) {
      handleUpdate(mainWindow);
    }
  });

app
  .once('ready', createMainWindow)
  .on('browser-window-focus', () => {
    if (forceDevTools() || isDev) {
      return;
    }

    globalShortcut.register('CommandOrControl+R', () => {});
    globalShortcut.register('F5', () => {});
  })
  .on('browser-window-blur', () => {
    if (forceDevTools() || isDev) {
      return;
    }

    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
  })
  .on('window-all-closed', () => {
    nodeServer?.kill();
    app.quit();
  });
