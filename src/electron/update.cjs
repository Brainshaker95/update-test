const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

/**
 * @type {import('electron').BrowserWindow | null}
 */
let mainWindow = null;

autoUpdater.autoDownload = false;
autoUpdater.disableWebInstaller = true;

autoUpdater.on('checking-for-update', () => {
  mainWindow?.webContents.send('checking-for-update');
});

autoUpdater.on('update-available', (info) => {
  mainWindow?.webContents.send('update-available', info);
});

autoUpdater.on('update-not-available', (info) => {
  mainWindow?.webContents.send('update-not-available', info);
});

autoUpdater.on('update-cancelled', () => {
  mainWindow?.webContents.send('update-cancelled');
});

autoUpdater.on('error', () => {
  mainWindow?.webContents.send('update-error');
});

autoUpdater.on('download-progress', (progress) => {
  /**
    * @type {UpdateProgress}
    */
  const updateProgress = {
    bytesPerSecond: progress.bytesPerSecond,
    percent: progress.percent,
    transferred: progress.transferred,
    total: progress.total,
  };

  mainWindow?.webContents.send('download-progress', updateProgress);
});

autoUpdater.on('update-downloaded', () => {
  mainWindow?.webContents.send('update-downloaded');
});

/**
 * @param {import('electron').BrowserWindow} mainWin
 */
const handleUpdate = (mainWin) => {
  mainWindow = mainWin;

  autoUpdater
    .checkForUpdates()
    .catch(() => {});
};

module.exports = handleUpdate;
