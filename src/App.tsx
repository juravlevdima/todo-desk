import { FC, useContext } from 'react'
import AppRoutes from './AppRoutes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { IThemeContext, ThemeContext } from './components/Providers/ThemeProvider'

const App: FC = () => {
  const { theme } = useContext(ThemeContext) as IThemeContext

  return (
    <div id="app" className={theme}>
      <Header/>
      <main className="flex-1 bg-white dark:bg-dark-2 transition-colors duration-500">
        <AppRoutes/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
