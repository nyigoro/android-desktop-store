import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { exec } from 'child_process';

// 📦 Handle install request from renderer
ipcMain.on('install-apk', (event, apkId: string) => {
  console.log(`Received install command for: ${apkId}`);

  // Simulate install — this will be replaced with real transformer call
  exec(`echo Installing ${apkId}...`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing ${apkId}:`, error);
      event.reply('install-result', `❌ Error installing ${apkId}: ${error.message}`);
      return;
    }

    console.log(stdout.trim());
    event.reply('install-result', `✅ Successfully installed ${apkId}`);
  });
});

// 🪟 Create the main app window
function createWindow() {
  let win: BrowserWindow | null = new BrowserWindow({
    title: `Android Desktop Store`,
    width: 1200,
    height: 800,
    show: false,
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

// 🖥️ Platform-specific tweaks

if (process.platform === 'linux') {
  app.disableHardwareAcceleration();
}

if (process.platform === 'win32') {
  app.setAppUserModelId('com.android.desktop.store');
}

// 🚀 App lifecycle
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
