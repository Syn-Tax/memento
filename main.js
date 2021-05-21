const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

// Modules to control application life and create native browser window
const {app, BrowserWindow, nativeTheme, session} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  mainWindow.removeMenu()
  nativeTheme.themeSource = 'light'

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

const react_devtools_path = path.join('C:\\Users\\twoca\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Extensions', 'fmkadmapgofadopljbjfkapdkoienihi\\4.13.2_0')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  session.defaultSession.loadExtension(react_devtools_path, {allowFileAccess: true})

      
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  console.log(session.getAllExtensions())
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.