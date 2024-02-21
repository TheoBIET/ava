import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'node:path'

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, './preload/preload.js'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
  });
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.on('ready', () => {
  createWindow()
});

ipcMain.on('get-app-version', (event) => {
  event.sender.send('get-app-version', {
    version: app.getVersion(),
    updateAvailable: false,
  })
});

ipcMain.on('quit-and-install', () => {
  autoUpdater.quitAndInstall()
});

autoUpdater.on('update-available', () => {
  win?.webContents.send('update_available')
});

autoUpdater.on('update-downloaded', () => {
  win?.webContents.send('update_downloaded')
});