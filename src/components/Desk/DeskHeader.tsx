import { FC, memo } from 'react'
import dragHandle from '../../images/drag-handle.svg'
import addItemIcon from '../../images/add-item.svg'
import { DragControls } from 'framer-motion'

type propTypes = {
  title: string
  controls: DragControls
}

const DeskHeader: FC<propTypes> = ({ title, controls }) => {
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

      <span className="text-xl font-semibold">{title}</span>

      <button
        className="hover:scale-125 transition duration-300 active:transition-none active:scale-100"
      >
        <img
          width="20px"
          src={addItemIcon}
          alt="Add"
          title="Добавить"
        />
      </button>
    </div>
  )
}

export default memo(DeskHeader)
