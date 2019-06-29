import { BrowserWindow, ipcMain } from 'electron'

let subWin: BrowserWindow | null

export default function createSubWindow(path: string, parent: BrowserWindow, width?: number, height?: number, updateDataRequest?: boolean) {
    subWin = new BrowserWindow({
      width,
      height,
      parent,
      resizable: false,
      fullscreenable: false,
      modal: true,
      webPreferences: {
        preload: `${__dirname}/../preload/index.js`
      }
    })
    subWin.removeMenu()

    subWin.loadURL(`file://${__dirname}/../../renderers/index.html#${path}`)

    subWin.on('closed', () => {
      if (updateDataRequest) {
        console.log('bind update data close event')
        parent.webContents.send('update-data')
      }
      subWin = null
    })
}
