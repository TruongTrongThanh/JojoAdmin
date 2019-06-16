import { Menu, MenuItem, BrowserWindow } from 'electron'

export default function createContextMenu(...items: MenuItem[]): Menu {
  const menu = new Menu()
  for (const i of items) {
    menu.append(i)
  }
  return menu
}