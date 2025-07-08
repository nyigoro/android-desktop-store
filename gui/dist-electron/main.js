"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    let win = new electron_1.BrowserWindow({
        title: `Android Desktop Store`,
        width: 1200,
        height: 800,
        show: false, // Wait until ready
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
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
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
electron_1.app.on('before-quit', () => {
    console.log('Application is about to quit');
});
electron_1.app.on('quit', () => {
    console.log('Application has quit');
});
