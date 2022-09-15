import { FC, useContext, useState, FocusEvent, DragEvent } from 'react'
import dragHandle from '../../images/drag-handle.svg'
import { AnimatePresence, DragControls } from 'framer-motion'
import TaskModal from '../Modals/AddTaskModal/TaskModal'
import { IDesk } from '../../types/desk.types'
import AddIcon from '../common/AddIcon'
import { ThemeContext } from '../Providers/ThemeProvider'
import { IThemeContext } from '../../types/theme.types'
import { useStores } from '../../hooks/useStores'

type propTypes = {
  desk: IDesk
  controls: DragControls
  onDrop: (e: DragEvent<HTMLDivElement>) => void
}

const DeskHeader: FC<propTypes> = ({ desk, controls, onDrop }) => {
  const { theme } = useContext(ThemeContext) as IThemeContext
  const { deskStore } = useStores()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRename, setIsRename] = useState(false)

  const saveTitle = (e: FocusEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim()
    if (trimmed) {
      deskStore.updateDeskData(desk.id, { title: trimmed })
    }
    setIsRename(false)
  }

  return (
    <div className="pb-3 flex justify-between" onDrop={onDrop}>
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
          ? <input
            onBlur={saveTitle}
            className="bg-transparent text-center w-40"
            type="text" defaultValue={desk.title}
            autoFocus
          />
          : <h2 className="cursor-pointer break-all" onDoubleClick={() => setIsRename(true)}>
            {desk.title}
          </h2>
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
        {isModalOpen && <TaskModal setIsModalOpen={setIsModalOpen} desk={desk} title="Добавить задачу" action="Добавить"/>}
      </AnimatePresence>
    </div>
  )
}

export default DeskHeader
