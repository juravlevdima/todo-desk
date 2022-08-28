import { FC, useState } from 'react'
import dragHandle from '../../images/drag-handle.svg'
import addItemIcon from '../../images/add-item.svg'
import { AnimatePresence, DragControls } from 'framer-motion'
import AddTaskModal from '../Modals/AddTaskModal'
import { IDesk } from '../../types/desk.types'

type propTypes = {
  desk: IDesk
  controls: DragControls
}

const DeskHeader: FC<propTypes> = ({ desk, controls }) => {
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
      >
        <img
          width="20px"
          src={addItemIcon}
          alt="Add"
          title="Добавить"
        />
      </button>

      <AnimatePresence>
        {isModalOpen && <AddTaskModal setIsModalOpen={setIsModalOpen} desk={desk} />}
      </AnimatePresence>
    </div>
  )
}

export default DeskHeader
