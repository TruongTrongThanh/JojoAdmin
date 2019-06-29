import { ipcRenderer } from 'electron'
import { ElectronWindow } from '@/models/html-api'
import { Genre } from '@/models/manga'

declare let window: ElectronWindow

window.genreContextMenuResultBindEvent = (deleteListener: (genre: Genre) => void) => {
  ipcRenderer.on('genre-context-menu-click', (e: Electron.Event, data: any) => {
    if (data.type === 'delete') deleteListener(data.genre)
  })
}

window.openGenreContextMenu = (genre: Genre) => {
  ipcRenderer.send('open-genre-context-menu', genre)
}

window.openGenreWindow = () => {
  ipcRenderer.send('create-sub-window', { path: 'genre-create', updateDataRequest: true })
}

window.updateDataListener = (callback: () => void) => {
  ipcRenderer.on('update-data', (e: Electron.Event, data: any) => {
    callback()
  })
}

window.showDialog = (message: string, title?: string, type?: string) => {
  ipcRenderer.send('show-dialog', { message, title, type })
}

window.showErrorDialog = (err: Error) => {
  ipcRenderer.send('show-error-dialog', err)
}
