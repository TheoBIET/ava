require('dotenv').config();
const { app, BrowserWindow, screen } = require('electron');
const { join } = require('path');

if (!app.requestSingleInstanceLock()) app.quit();

const isDev = process.env.NODE_ENV === 'development';
let window = null;

const build = async () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: width / 1.5,
    height: height / 1.5,
    minWidth: 800,
    minHeight: 600,
    fullscreenable: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });

  if (app.isPackaged) {
    return await window.loadFile(join(__dirname, '../dist/index.html'));
  }

  await window.loadURL('http://localhost:8080');
};

app.whenReady().then(build);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  window = null;
});

app.on('second-instance', () => {
  if (window) {
    if (window.isMinimized()) window.restore();
    window.focus();
  }
});

app.on('activate', () => {
  if (window === null) build();
});

// TODO: Fix electron-reload
// if (isDev) {
//   require('electron-reload')(__dirname, {
//     electron: join(__dirname, '../node_modules', '.bin', 'electron'),
//     electronArgs: ['app/index.js'],
//     hardResetMethod: 'exit'
//   });
// }