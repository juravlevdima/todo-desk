import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ThemeProvider from './components/Providers/ThemeProvider'

import './style/tailwind.css'
import './style/scrollbar.scss'
import './style/style.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
