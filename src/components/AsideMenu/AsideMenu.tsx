import { Dispatch, FC, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import closeIcon from '../../images/close.svg'
import { useStores } from '../../hooks/useStores'
import AsideMenuItem from './AsideMenuItem'
import { observer } from 'mobx-react-lite'

type propTypes = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

const AsideMenu: FC<propTypes> = observer(({ setIsMenuOpen }) => {
  const { deskStore } = useStores()

  return (
    <>
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-0 z-40 bg-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsMenuOpen(false)}
      />
      <motion.aside
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: '100%' }}
        exit={{ opacity: 0 }}
        className="absolute left-0 z-50 bg-white dark:bg-dark-3
          py-24 sm:py-16 px-3 shadow-xl dark:text-white flex justify-center
          w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5"
      >
        <ul className="">
          {deskStore.desks.map((desk) => (
            <AsideMenuItem
              desk={desk}
              key={desk.id}
              updateDeskData={deskStore.updateDeskData.bind(deskStore)}
              deleteDesk={deskStore.deleteDesk.bind(deskStore)}
            />
          ))}
        </ul>

        <h2 className="absolute top-4 left-0 right-0 text-center text-xl">Отобразить/Скрыть:</h2>
        <button
          className="h-6 w-6 hover:scale-125 transition duration-300 absolute top-2 right-2"
          title="Закрыть"
          onClick={() => setIsMenuOpen(false)}
        >
          <img className="rounded-md dark:bg-white" src={closeIcon} alt="close"/>
        </button>
      </motion.aside>
    </>
  )
})

export default AsideMenu
