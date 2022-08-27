import { FC, memo } from 'react'
import { IDesk } from '../../types/desk.types'
import DeskItem from './DeskItem'
import { cardDragOverHandler, dropCardHandler } from './desk.handlers'

type propTypes = {
  desk: IDesk
}

const Desk: FC<propTypes> = ({ desk }) => {
  return (
    <div
      className="border-2 border-black rounded-md py-5 px-5 w-96"
      onDragOver={(e) => cardDragOverHandler(e)}
      onDrop={(e) => dropCardHandler(e, desk)}
    >
      <div className="text-center text-xl font-semibold mb-3">{desk.title}</div>
      <div>
        {desk.items.map((task) => <DeskItem key={task.id} task={task} desk={desk}/>)}
      </div>
    </div>
  )
}

export default memo(Desk)
