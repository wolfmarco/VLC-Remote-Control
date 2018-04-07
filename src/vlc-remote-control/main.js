const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const ref = require('ref');
const ffi = require('ffi');
var Struct = require('ref-struct')
const { U, DS } = require('win32-api');

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
    setTimeout(StartMessageHandlerApi,0);
  }
});

function TestWndProc()
{
  
}

// BOOL WINAPI GetMessage(
//   _Out_    LPMSG lpMsg,
//   _In_opt_ HWND  hWnd,
//   _In_     UINT  wMsgFilterMin,
//   _In_     UINT  wMsgFilterMax
// );

function StartMessageHandlerApi()
{
  try
  {
    const user32 = U.load();
    const msg = new Struct(DS.MSG)();
    let count = 0;
    const countLimit = 200;
    const start = new Date().getTime();
    const ttl = 30; // sec

    // let title = win.getTitle();
    // const lpszWindow = Buffer.from(title, 'ucs2');
    // const hWnd = user32.FindWindowExW(null, null, null, lpszWindow);
    const hWnd = win.getNativeWindowHandle();

    while (count < countLimit && user32.GetMessageW(msg.ref(), hWnd, 0, 0))
    {
      count++;
      if (new Date().getTime() - start > ttl * 1000) {
          console.log('timeout and exit.');
          break;
      }
      console.log("msg (" + new Date().getTime() + "): " + user32.TranslateMessageEx( msg.ref() ));
      // console.log( new Date().getTime() + ": " + user32.TranslateMessageEx( msg.ref() ) );
      // console.log( new Date().getTime() + ": " + user32.DispatchMessageW( msg.ref() ) );
      user32.DispatchMessageW( msg.ref() );
    }
  }
  catch(err)
  {
    console.log(err);
  }
}

function StartMessageHandler()
{
  try
  {
    console.log("Register user32.dll ...");

    var typeObject = ref.types.Object;
    var typeObjectPtr = new ref.refType(typeObject);
    var typeObjectPtrPtr = new ref.refType(typeObjectPtr);

    var typeVoid = ref.types.void;
    var typeVoidPtr = new ref.refType(typeVoid);
    var typeVoidPtrPtr = new ref.refType(typeVoidPtr);

    var typeObject = ref.types.Object;
    var typeObjectPtr = new ref.refType(typeObject);

    var typeInt32 = ref.types.int32;
    var typeInt32Ptr = new ref.refType(typeInt32);

    //GetMessageW(lpMsg: GT.LPMSG, HWND: GT.HWND | null, wMsgFilterMin: GT.UINT, wMsgFilterMax: GT.UINT): GT.BOOL
    //export type LPMSG = Buffer
    //export type HWND = Buffer
    //export type UINT = number
    //export type BOOL = number

    var user32 = ffi.Library('user32',
    {
      'FindWindowExW': ['int',['int','int','int','int']],
      'GetAsyncKeyState': ['int',['int']],
      'GetMessage': ['number',['Buffer','Buffer','number','number']]
    });

    console.log("... finished!");

    let title = win.getTitle();
    const lpszWindow = Buffer.from(title, 'ucs2');
    const electron_hWnd = user32.FindWindowExW(null, null, null, lpszWindow);
    console.log("electron_hWnd: " + electron_hWnd);

    let bRet;
    
    while( (bRet = GetMessage( msg, hWnd, 0, 0 )) != 0)
    { 
      if (bRet == -1)
      {
        // handle the error and possibly exit
        console.log("ERROR!");
      }
      else
      {
        console.log("bRet: " + bRet);
      }
    }
  }
  catch(err)
  {
    console.log(err);
  }
}

async function StartKeyStateLogger()
{
  try
  {
    //ffi.Library(libraryFile, { functionSymbol: [ returnType, [ arg1Type, arg2Type, ... ], ... ]);
    var user32 = ffi.Library('user32',
    {
      'GetAsyncKeyState': ['int',['int']]
    });
    
    var i;
    for (i = 0; i < 256; i++) { 
      let keyState = user32.GetAsyncKeyState(i);
      if(keyState != 0)
      {
        let message = i + ": " + keyState;
        if(win && win.webContents)
        {
          win.webContents.send('log' , {msg: message});
        }
      }
      if(i == 255)
        setTimeout(StartKeyStateLogger,0);
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