declare interface Window {
  /* src/main/preload/openGenreWindow.js */
  openGenreWindow: () => void
  openGenreContextMenu: (genre: any) => void
  genreContextMenuResultBindEvent: (deleteListener: (genre: any) => void) => void
}