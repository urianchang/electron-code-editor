const { app, BrowserWindow } = require('electron')
const path = require('path')
const {shell} = require('electron')

let mainWindow;

app.on('ready', () => {
    const index = path.join(__dirname, 'index.html')
    //: Open Chromium browser window
    mainWindow = new BrowserWindow({});
    //: Load index.html
    mainWindow.loadURL(`file:///${index}`);

    //: WebContents is responsible for rendering and controlling web page
    //: Prevent user from navigating to another URL
    mainWindow.webContents.on('will-navigate', (e, url) => {
        e.preventDefault();
        console.log(`Tried to navigate to: ${url}`)
        mainWindow.webContents.send('navigate', url);
    });
});
