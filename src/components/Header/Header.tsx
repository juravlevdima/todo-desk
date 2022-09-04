import { FC, useContext, useState } from 'react'
import { IThemeContext } from '../../types/theme.types'
import { ThemeContext } from '../Providers/ThemeProvider'
import AddIcon from '../common/AddIcon'
import { AnimatePresence } from 'framer-motion'
import DeskModal from '../Modals/DeskModal/DeskModal'
import menuIcon from '../../images/menu.svg'
import AsideMenu from '../AsideMenu/AsideMenu'

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const changeTheme = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <header className="bg-gray-300 dark-theme dark:bg-dark-1">
        <div className="px-2 md:px-6 lg:px-8 xl:px-10 2xl:px-12 flex justify-between items-center py-2">
          <div>
            <button
              className="hover:scale-125 transition duration-300 active:transition-none active:scale-100 mr-2"
              title="Открыть меню"
              onClick={() => setIsMenuOpen(true)}
            >
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
          <div
            role="button"
            tabIndex={0}
            className="w-12 bg-gray-700 rounded-full relative outline-blue-600"
            onClick={changeTheme}
          >
            <span>🌞 🌜</span>
            <div
              className={`absolute bg-white rounded-full w-6 h-6 hover:bg-gray-400
                border-4 border-gray-700 top-0 left-0 transition duration-300
                ${theme === 'dark' && 'translate-x-full'}`}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isModalOpen && <DeskModal setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && <AsideMenu setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>
    </>
  )
}

export default Header
