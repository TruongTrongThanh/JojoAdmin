import { ipcRenderer } from 'electron'
import ElectronWindow from '@/models/html-api'
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
  ipcRenderer.send('create-sub-window', { path: 'genre-create' })
}

