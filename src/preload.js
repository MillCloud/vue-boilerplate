/* eslint-disable import/no-extraneous-dependencies */
const { ipcRenderer } = require('electron');

// @ts-ignore
window.ipcRenderer = ipcRenderer;
