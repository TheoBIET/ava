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
      contextIsolation: false,
      nodeIntegration: true
    },
  });

  if (app.isPackaged) {
    return await window.loadFile(join(__dirname, '../dist/index.html'));
  }

  await window.loadURL('http://localhost:8080');

  if (isDev) {
    window.webContents.openDevTools();
  }
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

const { ipcMain } = require('electron');
const { PythonShell } = require('python-shell');
const EVENTS = require('../constants/ipcEvents.json');

ipcMain.on(EVENTS.WINDOW.CLOSE, () => {
  window.close();
});

ipcMain.on(EVENTS.WINDOW.MINIMIZE, () => {
  window.minimize();
});

ipcMain.on(EVENTS.VOICE_DEVICES.GET, (event, _) => {
  let options = {
    mode: 'json',
    pythonPath: 'app/modules/voice-detection/.venv/Scripts/python.exe',
    scriptPath: 'app/modules/voice-detection',
  };

  PythonShell.run('voice-detection.py', options)
    .then(([devices]) => {
      event.reply(EVENTS.VOICE_DEVICES.SET, devices);
    })
    .catch((err) => {
      event.reply(EVENTS.VOICE_DEVICES.SET, err);
    });
});