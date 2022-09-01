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
      className="task pb-2 pt-1"
      onDrop={(e) => dropHandler(e, desk, task)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      <div
        className={`${styles.draggable} px-6 py-1 break-words bg-zinc-100 rounded-md
          cursor-grab active:cursor-grabbing dark-theme dark:bg-dark-4`}
        draggable={true}
        onDragStart={(e) => dragStartHandler(e, desk, task)}
        onDragEnd={(e) => dragEndHandler(e)}
      >
        <div className={`pb-1 font-semibold ${task.description && 'border-b border-gray-400'}`}>{task.title}</div>
        <div className="pl-2 py-1 font-light text-sm">{task.description}</div>
      </div>
    </div>
  )
}

export default memo(DeskItem)
