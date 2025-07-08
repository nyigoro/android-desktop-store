"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// gui/electron/preload.ts
const electron_1 = require("electron");
// This preload script is used to expose a secure API to the renderer process
// and to prevent direct access to Node.js APIs in the renderer.
// It uses Electron's contextBridge to safely expose APIs.
// This is important for security, especially when using context isolation.
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // Function to send a command to convert an APK file
    sendConvertCommand: (apkId) => {
        electron_1.ipcRenderer.send('convert-apk', apkId);
    },
    // Function to listen for the result of the conversion
    onConvertResult: (callback) => {
        electron_1.ipcRenderer.on('convert-result', (_event, result) => {
            callback(result);
        });
    },
    // Function to send a command to install an APK file 
    sendInstallCommand: (apkId) => {
        electron_1.ipcRenderer.send('install-apk', apkId);
    },
    // Function to listen for the result of the installation
    onInstallResult: (callback) => {
        electron_1.ipcRenderer.on('install-result', (_event, result) => {
            callback(result);
        });
    }
});
// Optional: Expose other APIs as needed
electron_1.contextBridge.exposeInMainWorld('appInfo', {
    version: process.env.npm_package_version || '0.1.0',
    name: process.env.npm_package_name || 'Android Desktop Store'
});
