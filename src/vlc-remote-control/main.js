const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const ffi = require('ffi');

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
});

ipcMain.on('ready', (event, arg) => {  
  console.log("ready: " + arg);
  // win.webContents.send('changeText' , "HI");
  // event.sender.send('async-reply', 2);
  // win.webContents.send('log' , {msg: 'good!'});
  if(isWindows)
  {
    console.log("isWindows");
    TryFfi();
  }
});

async function TryFfi()
{
  try
  {
    console.log("TryFfi");

    //ffi.Library(libraryFile, { functionSymbol: [ returnType, [ arg1Type, arg2Type, ... ], ... ]);
    var user32 = ffi.Library('user32',
    {
      'GetAsyncKeyState': ['int',['int']]
    });
    
    var i;
    for (i = 0; i < 256; i++) { 
      console.log(i);
      let message = i + ": " + user32.GetAsyncKeyState(i);
      win.webContents.send('log' , {msg: message});
    }
  }
  catch(err)
  {
    console.log(err);
  }
}

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