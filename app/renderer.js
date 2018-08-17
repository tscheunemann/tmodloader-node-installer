'use strict';

const classInitializer = require('./classes/class_init.js');
const contextMenus = require('electron-context-menu');

window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');
window.Bootstrap = require('bootstrap');

contextMenus();

classInitializer.getInstance().getDemoInstance();
