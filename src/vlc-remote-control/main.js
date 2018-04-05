const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

const isWindows = process.platform === "win32";
const isMac = process.platform === "darwin";

function createWindow ()
{
  win = new BrowserWindow
  ({
    fullscreen: true,
    autoHideMenuBar: true
  });

  // load the dist folder from Angular
  win.loadURL(url.format
  ({
    pathname: path.join(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools optionally:
  win.webContents.openDevTools()

  win.on('closed', () =>
  {
    win = null
  });
}

app.on('ready', () =>
{
  createWindow();
  if(isWindows)
  {
    console.log("isWindows");
  }
});

app.on('window-all-closed', () =>
{
  if (!isMac)
  {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null)
  {
    createWindow();
  }
});