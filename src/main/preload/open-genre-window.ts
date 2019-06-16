import { ipcRenderer } from 'electron'

window.openGenreWindow = () => {
  ipcRenderer.send('create-sub-window', {
    path: 'genre-create',
    scriptPath: 'preload/open-genre-window.js'
  })
}
