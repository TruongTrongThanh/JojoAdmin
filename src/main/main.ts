import { app, BrowserWindow, MenuItem, Menu, dialog } from 'electron'
import { ipcMain } from 'electron'
import { Genre } from '@/models/manga'
import createSubWindow from './native/sub-window'
import createContextMenu from './native/context-menu'
import firebase from 'firebase'

// tslint:disable
require('electron-reload')(__dirname)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

function createMainWindow(path: string) {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload/index.js`
    }
  })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/../renderers/index.html#${path}`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createGenreContextMenu(e: Electron.Event, genre: Genre): Menu {
  const deleteItem = new MenuItem({
    id: '1',
    label: 'Delete',
    click: (mItem, mWin, clickEvent) => {
      e.sender.send('genre-context-menu-click', { genre, type: 'delete' })
    }
  })
  return createContextMenu(deleteItem)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createMainWindow('manga-create')
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createMainWindow('manga-create')
  }
})

ipcMain.on('create-sub-window', (e: Event, data: any) => {
  createSubWindow(data.path, win!, 400, 400, data.updateDataRequest)
})

ipcMain.on('open-genre-context-menu', (e: Electron.Event, genre: any) => {
  const menu = createGenreContextMenu(e, genre)
  menu.popup()
})

ipcMain.on('show-dialog', (e: Electron.Event, data: any) => {
  dialog.showMessageBox(BrowserWindow.fromWebContents(e.sender), {
    title: data.title || 'Thông báo',
    type: data.type,
    message: data.message
  })
})

ipcMain.on('show-error-dialog', (e: Electron.Event, err: Error) => {
  dialog.showErrorBox(err.name, err.message)
})
