const { dialog } = require('electron').remote;

window.electron = {};
window.electron.dialog = dialog;

window.require = require
