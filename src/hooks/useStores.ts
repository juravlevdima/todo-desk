import { useContext } from 'react'
import { rootStoreContext } from '../store'

export const useStores = () => useContext(rootStoreContext)
