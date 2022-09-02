import { FC, useContext } from 'react'
import AppRoutes from './AppRoutes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { ThemeContext } from './components/Providers/ThemeProvider'
import { IThemeContext } from './types/theme.types'

const App: FC = () => {
  const { theme } = useContext(ThemeContext) as IThemeContext

  return (
    <div id="app" className={theme}>
      <Header/>
      <main className="flex-1 bg-gray-100 dark-theme dark:bg-dark-2">
        <AppRoutes/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
