
// Modules to control application life and create native browser window
const { app, BrowserWindow, nativeTheme, protocol } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const debug = require('electron-debug')
const windowStateKeeper = require('electron-window-state')

const dataFolder = path.join(app.getPath('userData'), "./Data")

debug()

function createWindow(windowState) {
  // force light theme since no dark theme has been implemented
  nativeTheme.themeSource = 'light'
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false
    },
    preload: path.join(__dirname, "preload.js")
  })

  // remove the menubar from the window
  mainWindow.removeMenu()

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  // if running in dev mode, open the developer tools automatically
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // allow the window to remember where it was placed and what size it was
  let win
  let windowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })

  // create the window
  createWindow(windowState)

  // allow the window state to be managed
  windowState.manage(win)
  /*
  // register the custom file protocol for getting images dynamically
  protocol.registerFileProtocol('file', (request, callback) => {
    const url = decodeURI(request.url.replace('file://', '')) //get the path to the requested image
    callback({ path: path.join(dataFolder, ".images", url) }) // return the requested image
  })
  */

  // boilerplate for MacOS
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow(windowState)
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})