import { FC, useContext, useState } from 'react'
import dragHandle from '../../images/drag-handle.svg'
import { AnimatePresence, DragControls } from 'framer-motion'
import AddTaskModal from '../Modals/AddTaskModal/AddTaskModal'
import { IDesk } from '../../types/desk.types'
import AddIcon from '../common/AddIcon'
import { IThemeContext, ThemeContext } from '../Providers/ThemeProvider'

type propTypes = {
  desk: IDesk
  controls: DragControls
}

const DeskHeader: FC<propTypes> = ({ desk, controls }) => {
  const { theme } = useContext(ThemeContext) as IThemeContext
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mb-3 flex justify-between">
      <img
        className="cursor-grab active:cursor-grabbing select-none"
        onPointerDown={(e) => controls.start(e)}
        draggable={false}
        src={dragHandle}
        alt="Handle"
        title="Передвинуть"
      />

      <span className="text-xl font-semibold">{desk.title}</span>

      <button
        className="hover:scale-125 transition duration-300 active:transition-none active:scale-100"
        onClick={() => setIsModalOpen(true)}
        title="Добавить"
      >
        <AddIcon fill={theme === 'light' ? '#000' : '#fff'}/>
      </button>

      <AnimatePresence>
        {isModalOpen && <AddTaskModal setIsModalOpen={setIsModalOpen} desk={desk}/>}
      </AnimatePresence>
    </div>
  )
}

export default DeskHeader
