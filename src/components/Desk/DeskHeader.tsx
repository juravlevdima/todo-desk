import { FC, useContext, useState } from 'react'
import dragHandle from '../../images/drag-handle.svg'
import { AnimatePresence, DragControls } from 'framer-motion'
import AddTaskModal from '../Modals/AddTaskModal/AddTaskModal'
import { IDesk } from '../../types/desk.types'
import AddIcon from '../common/AddIcon'
import { ThemeContext } from '../Providers/ThemeProvider'
import { IThemeContext } from '../../types/theme.types'

type propTypes = {
  desk: IDesk
  controls: DragControls
}

const DeskHeader: FC<propTypes> = ({ desk, controls }) => {
  const { theme } = useContext(ThemeContext) as IThemeContext
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRename, setIsRename] = useState(false)

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

      <div className="text-lg font-semibold text-center px-3">
        {isRename
          ? <input autoFocus className="bg-transparent text-center w-40" type="text" defaultValue={desk.title}/>
          : <span onDoubleClick={() => setIsRename(true)}>
            {desk.title}
          </span>
        }
      </div>

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
