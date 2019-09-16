'use strict';

const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const os = require('os');
const path = require('path');
const config = require(path.join(__dirname, 'package.json'));
const BrowserWindow = electron.BrowserWindow;
const windowWidthScalingFactor = 0.70;
const windowHeightScalingFactor = 0.60;

app.setName(config.productName);

var mainWindow = null;

app.on('ready', function () {
    let screenElectron = electron.screen;
    let screen = screenElectron.getAllDisplays()[screenElectron.getAllDisplays().length - 1];

    let dimensions = screen.size;
    let bounds = screen.bounds;

    let width = Math.ceil(dimensions.width * windowWidthScalingFactor);
    let height = Math.ceil(dimensions.height * windowHeightScalingFactor);

    let x = Math.ceil(bounds.x + ((bounds.width - width) / 2));
    let y = Math.ceil(bounds.y + ((bounds.height - height) / 2));

    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: width,
        height: height,
        x: x,
        y: y,
        backgroundColor: 'lightgray',
        title: config.productName,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            defaultEncoding: 'UTF-8'
        }
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    mainWindow.once('ready-to-show', () => {
        mainWindow.setMenu(null);
        // mainWindow.webContents.openDevTools();
        mainWindow.show();
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.setMenuBarVisibility(false);

    // Enable keyboard shortcuts for Developer Tools on various platforms.
    let platform = os.platform();

    if (platform === 'darwin') {
        globalShortcut.register('Command+Option+I', () => {
            mainWindow.webContents.openDevTools();
        });
    } else if (platform === 'linux' || platform === 'win32') {
        globalShortcut.register('Control+Shift+I', () => {
            mainWindow.webContents.openDevTools();
        });
    }

    mainWindow.onbeforeunload = (e) => {
        // Prevent Command-R from unloading the window contents.
        e.returnValue = false;
    };
});

app.on('window-all-closed', () => {
    app.quit();
});
