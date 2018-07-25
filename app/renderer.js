'use strict'

require('./classes/class_init.js');
const contextMenus = require('electron-context-menu');

window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');
window.Bootstrap = require('bootstrap');

contextMenus();

let controller = classInitializer.getInstance().getDemoInstance();
