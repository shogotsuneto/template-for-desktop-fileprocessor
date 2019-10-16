const { app, BrowserWindow, ipcMain } = require('electron')
const { download } = require('electron-dl');
const server = require('server')

let win
let port

ipcMain.on('file', (event, {name, path}) => {
  console.log(name, path, port)
  download(win, `http://127.0.0.1:${port}/?path=${encodeURIComponent(path)}`, { filename: `${name}.txt`})
})

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + "/preload.js",
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  const listener = server.listen(0, () => {
    port = listener.address().port
    createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.