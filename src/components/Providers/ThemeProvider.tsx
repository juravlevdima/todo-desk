import { createContext, FC, PropsWithChildren, useState } from 'react'

type ThemeT = 'light' | 'dark'

export interface IThemeContext {
  toggleTheme: (theme: ThemeT) => void
  theme: ThemeT
}

const getThemeFromLS = (): ThemeT => {
  const theme = localStorage.getItem('theme')
  if (theme && (theme === 'light' || theme === 'dark')) {
    return theme
  }
  return 'light'
}

export const ThemeContext = createContext<IThemeContext | null>(null)


const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeT>(getThemeFromLS)

  const toggleTheme = (theme: ThemeT): void => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
