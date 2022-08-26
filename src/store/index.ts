import { createContext } from 'react'
import DeskStore from './desks/DeskStore'

export const rootStoreContext = createContext({
  deskStore: new DeskStore()
})
