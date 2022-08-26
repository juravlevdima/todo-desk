import { FC } from 'react'
import AppRoutes from './AppRoutes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App: FC = () => {
  return (
    <>
      <Header/>
      <main id="app">
        <AppRoutes/>
      </main>
      <Footer/>
    </>
  )
}

export default App
