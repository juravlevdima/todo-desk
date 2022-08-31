import { FC, memo, useContext } from 'react'
import { IThemeContext, ThemeContext } from '../Providers/ThemeProvider'

const Header: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext) as IThemeContext

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="text-center text-2xl py-4 transition-colors duration-500 dark:bg-dark-1 dark:text-white">
      <span>Todo Desk</span>
      <button onClick={changeTheme} className="absolute right-5 top-3 text-base">
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  )
}

export default memo(Header)
