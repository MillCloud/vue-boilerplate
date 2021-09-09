/* eslint-disable import/no-extraneous-dependencies */
// commonjs for browsers
const { ipcRenderer } = require('electron');

window.ipcRenderer = ipcRenderer;
/* eslint-enable import/no-extraneous-dependencies */
