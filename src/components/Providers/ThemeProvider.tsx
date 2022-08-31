import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react'

export const ThemeContext = createContext<IThemeContext | null>(null)

type ThemeT = 'light' | 'dark'

export interface IThemeContext {
  setTheme: Dispatch<SetStateAction<ThemeT>>
  theme: ThemeT
}

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeT>('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
