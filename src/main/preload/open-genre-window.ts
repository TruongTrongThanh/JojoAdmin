import { ipcRenderer } from 'electron'

window.openGenreWindow = () => {
  return ipcRenderer.send('create-sub-window', {
    path: 'genre-create',
    scriptPath: 'preload/open-genre-window.js'
  })
}