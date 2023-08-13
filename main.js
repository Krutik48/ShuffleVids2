const { app, BrowserWindow } = require('electron');

const isSecondInstance = app.requestSingleInstanceLock();
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 650,
    title: 'Video Player',
    icon: __dirname + '/icon.png',
    autoHideMenuBar: true,
    webPreferences: {
      devTools: true
    }
  });

  if (process.argv[1]) {
    win.loadFile('index.html', { query: { filePath: process.argv[1]}});
  }
  else{
    win.loadFile('index.html');
  }
  
  // win.webContents.once('dom-ready', () => {
  //   win.webContents.executeJavaScript(`
  //   const document = window.document;
  //   console.log(document);
  //   `);
  // });
}

// if path is passed as argument



app.on('ready', () => {
  createWindow();

  // Handle the open-file event
  // app.on('open-file', (event, filePath) => {
  //   console.log(filePath);
  //   win.webContents.executeJavaScript(`
  //   const document = window.document;
  //   console.log(${filePath});
  //   console.log("hi");
  //   `);
  //   event.preventDefault();
  //   win.loadFile('index.html', { query: { filePath } });
  // });


});

if(!isSecondInstance){
  app.quit();
}
else{
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore();
      createWindow();
    }
  });
}

