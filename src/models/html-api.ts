import { Genre } from '@/models/manga'

export default interface ElectronWindow extends Window {
  openGenreWindow: () => void
  openGenreContextMenu: (genre: Genre) => void
  genreContextMenuResultBindEvent: (deleteListener: (genre: Genre) => void) => void
}