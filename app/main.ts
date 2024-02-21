import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { IpcChannelInterface } from './interfaces/IpcChannel';
import path from 'node:path'

import { SystemChannel } from './ipc/system';
import { VersionChannel } from './ipc/version';

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

class Main {
  private mainWindow: BrowserWindow | undefined;

  public init(ipcChannels: IpcChannelInterface[]) {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    autoUpdater.on('update-available', () => {
      this.mainWindow?.webContents.send('update_available')
    });

    autoUpdater.on('update-downloaded', () => {
      this.mainWindow?.webContents.send('update_downloaded')
    });

    this.registerIpcChannels(ipcChannels);
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
      width: 1600,
      height: 900,
      webPreferences: {
        preload: path.join(__dirname, './preload/preload.js'),
      },
    })

    if (!VITE_DEV_SERVER_URL) this.mainWindow.loadFile(path.join(process.env.DIST, 'index.html'));
    else {
      this.mainWindow.loadURL(VITE_DEV_SERVER_URL);
      this.mainWindow.webContents.openDevTools();
    }

    this.mainWindow.on('ready-to-show', () => {
      autoUpdater.checkForUpdatesAndNotify()
    });
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }
}

(new Main()).init([
  new SystemChannel(),
  new VersionChannel(),
]);