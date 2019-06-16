import { BrowserWindow } from 'electron'

let subWin: BrowserWindow | null

export default function createSubWindow(path: string, parent: BrowserWindow, width?: number, height?: number, scriptPath?: string) {
    subWin = new BrowserWindow({
      width,
      height,
      parent,
      resizable: false,
      fullscreenable: false,
      modal: true,
      webPreferences: {
        preload: scriptPath ? `${__dirname}/${scriptPath}` : undefined
      }
    })
    subWin.removeMenu()

    subWin.loadURL(`file://${__dirname}/../../renderers/index.html#${path}`)

    subWin.on('closed', () => {
      subWin = null
    })
}
