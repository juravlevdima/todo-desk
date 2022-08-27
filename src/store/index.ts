import { createContext } from 'react'
import DeskStore from './desks/DeskStore'

export const store = {
  deskStore: new DeskStore()
}

export const rootStoreContext = createContext(store)
