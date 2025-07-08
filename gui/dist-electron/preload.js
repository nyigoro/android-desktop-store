"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose safe APIs to the renderer process
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel, data) => {
        electron_1.ipcRenderer.send(channel, data);
    },
    receive: (channel, callback) => {
        electron_1.ipcRenderer.on(channel, callback);
    }
});
