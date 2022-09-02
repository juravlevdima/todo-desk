import { FC, memo, useContext } from 'react'
import { IThemeContext } from '../../types/theme.types'
import { ThemeContext } from '../Providers/ThemeProvider'

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext

  const changeTheme = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="text-center text-2xl py-4 bg-gray-300 dark-theme dark:bg-dark-1">
      <span>Todo Desk</span>
      <button onClick={changeTheme} className="absolute right-5 top-3 text-base">
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  )
}

export default memo(Header)
