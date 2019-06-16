import { ipcRenderer } from 'electron'

window.genreContextMenuResultBindEvent = (deleteListener: (genre: any) => void) => {
  ipcRenderer.on('genre-context-menu-click', (e: Electron.Event, data: any) => {
    if (data.type === 'delete') deleteListener(data.genre)
  })
}

window.openGenreContextMenu = (genre: any) => {
  ipcRenderer.send('open-genre-context-menu', genre)
}
