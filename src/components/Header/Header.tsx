import { FC, useContext, useState } from 'react'
import { IThemeContext } from '../../types/theme.types'
import { ThemeContext } from '../Providers/ThemeProvider'
import AddIcon from '../common/AddIcon'
import { AnimatePresence } from 'framer-motion'
import DeskModal from '../Modals/DeskModal/DeskModal'
import menuIcon from '../../images/menu.svg'

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const changeTheme = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <header className="bg-gray-300 dark-theme dark:bg-dark-1">
        <div className="container flex justify-between items-center py-2">
          <div>
            <button className="hover:scale-125 transition duration-300 active:transition-none active:scale-100 mr-2">
              <img src={menuIcon} alt="Menu"/>
            </button>
            <button
              className="hover:scale-125 transition duration-300 active:transition-none active:scale-100"
              title="Создать новый стол"
              onClick={() => setIsModalOpen(true)}
            >
              <AddIcon fill={theme === 'light' ? '#000' : '#fff'}/>
            </button>
          </div>
          <div className="text-2xl font-serif italic">Todo Desk</div>
          <button onClick={changeTheme} className="text-base">
            {theme === 'light' ? 'dark' : 'light'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isModalOpen && <DeskModal setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>
    </>
  )
}

export default Header
