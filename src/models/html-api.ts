import { Genre } from '@/models/manga'

export interface ElectronWindow extends Window {
  openGenreWindow: () => void
  openGenreContextMenu: (genre: Genre) => void
  genreContextMenuResultBindEvent: (deleteListener: (genre: Genre) => void) => void
  updateDataRequest: () => void
  updateDataListener: (callback: () => void) => void
  showDialog: (message: string, title?: string, type?: string) => void
  showErrorDialog: (err: Error) => void
}
