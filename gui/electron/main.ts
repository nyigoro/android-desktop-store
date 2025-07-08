import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  let win: BrowserWindow | null = new BrowserWindow({
    title: `Android Desktop Store`,
    width: 1200,
    height: 800,
    show: false, // Wait until ready
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173');

  win.once('ready-to-show', () => win?.show());
  win.on('closed', () => (win = null));
  win.on('unresponsive', () => console.error('The window is unresponsive'));
  win.on('responsive', () => console.log('The window is responsive again'));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.on('before-quit', () => {
  console.log('Application is about to quit');
});
app.on('quit', () => {
  console.log('Application has quit');
});