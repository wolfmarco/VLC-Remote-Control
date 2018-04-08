const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

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
  if(isWindows)
  {
    hookWindowMessages();
  }
});

function hookWindowMessages()
{
  //https://wiki.winehq.org/List_Of_Windows_Messages
  //https://msdn.microsoft.com/de-de/library/windows/desktop/ms646280(v=vs.85).aspx
  const WM_KEYDOWN = 256;
  win.hookWindowMessage(WM_KEYDOWN, (virtualKeyCode, metaData) =>
  {
    try
    {
      //Uint8Array(8) [32, 0, 0, 0, 0, 0, 0, 0] => 0x2000000000000000
      let virtualKeyCodeHex = `0x${Buffer.from(virtualKeyCode).toString('hex')}`;
      win.webContents.send('log' , {msg: virtualKeyCodeHex});
    }
    catch(err)
    {
      console.log(err);
    }
  });
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