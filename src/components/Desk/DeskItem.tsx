import { FC, memo } from 'react'
import { IDesk, ITask } from '../../types/desk.types'

import styles from './Desk.module.scss'
import { dragEndHandler, dragLeaveHandler, dragOverHandler, dragStartHandler, dropHandler } from './desk.handlers'

type propTypes = {
  task: ITask
  desk: IDesk
}

const DeskItem: FC<propTypes> = ({ task, desk }) => {
  return (
    <div
      className="task text-center pb-2 pt-1"
      onDrop={(e) => dropHandler(e, desk, task)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      <div
        className={`${styles.draggable} px-8 border border-gray-600 break-words cursor-grab active:cursor-grabbing`}
        draggable={true}
        onDragStart={(e) => dragStartHandler(e, desk, task)}
        onDragEnd={(e) => dragEndHandler(e)}
      >
        {task.title}
      </div>
    </div>
  )
}

export default memo(DeskItem)
