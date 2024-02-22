import path from 'node:path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { IpcChannelInterface } from '../shared/interfaces/IpcChannel';

import { SystemChannel } from './ipc/system';
import { VersionChannel } from './ipc/version';
import { ChatChannel } from './ipc/chat';

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

class Main {
  private mainWindow: BrowserWindow | undefined;

  constructor(ipcChannels: IpcChannelInterface[]) {
    this.mainWindow = undefined;
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
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
      minWidth: 1200,
      minHeight: 800,
      frame: false,
      webPreferences: {
        contextIsolation: true,
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

    autoUpdater.on('update-available', () => {
      this.mainWindow?.webContents.send('update_available')
    });

    autoUpdater.on('update-downloaded', () => {
      this.mainWindow?.webContents.send('update_downloaded')
    });

    ipcMain.on('close', () => app.quit());
    ipcMain.on('minimize', () => this.mainWindow?.minimize());
    ipcMain.on('maximize', () => {
      if (this.mainWindow?.isMaximized()) this.mainWindow?.unmaximize();
      else this.mainWindow?.maximize();
    });
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }
}

new Main([
  new SystemChannel(),
  new VersionChannel(),
  new ChatChannel(),
]);