import { FC, memo } from 'react'
import { IDesk } from '../../types/desk.types'
import DeskItem from './DeskItem'
import { cardDragOverHandler, dropCardHandler } from './desk.handlers'
import { Reorder, useDragControls } from 'framer-motion'
import dragHandle from '../../images/drag-handle.svg'

type propTypes = {
  desk: IDesk
}

const Desk: FC<propTypes> = ({ desk }) => {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={desk}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.1,
        backgroundColor: 'white'
      }}
    >
      <div
        className="border-2 border-black rounded-md py-5 px-5 w-96 h-full"
        onDragOver={(e) => cardDragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, desk)}
      >
        <div className="mb-3 text-center relative">
          <span className="text-xl font-semibold">{desk.title}</span>
          <img
            className="absolute top-0 right-0 cursor-grab active:cursor-grabbing select-none"
            onPointerDown={(e) => controls.start(e)}
            draggable={false}
            src={dragHandle}
            alt="Handle"/>
        </div>

        <div>
          {desk.items.map((task) => <DeskItem key={task.id} task={task} desk={desk}/>)}
        </div>
      </div>
    </Reorder.Item>
  )
}

export default memo(Desk)
