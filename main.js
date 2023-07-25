const { app, BrowserWindow } = require('electron');


let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 650,
    title: 'Video Player',
    icon: __dirname + '/icon.png',
    autoHideMenuBar: true,
    // webPreferences: {
    //   webSecurity: false,
    //   allowRunningInsecureContent: true,
    //   allowDisplayingInsecureContent: true,
    //   webviewTag: true,
    //   webgl: true,
    //   nodeIntegration: true,
    //   contextIsolation: false,
    //   enableRemoteModule: true,
    //   webviewTag: true
    // }
  });

  
  win.loadFile('index.html');
  
  win.webContents.once('dom-ready', () => {
    win.webContents.executeJavaScript(`
    const document = window.document;
    console.log(document);
    `);
  });
}



app.on('ready', () => {
  createWindow();

  // Handle the open-file event
  app.on('open-file', (event, filePath) => {
    console.log(filePath);
    win.webContents.executeJavaScript(`
    const document = window.document;
    console.log(${filePath});
    console.log("hi");
    `);
    event.preventDefault();
    win.loadFile('index.html', { query: { filePath } });
  });
});