import { FC, memo } from 'react'
import { IDesk, ITask } from '../../types/desk.types'
import { dragEndHandler, dragLeaveHandler, dragOverHandler, dragStartHandler, dropHandler } from './desk.handlers'

import urgentIcon from '../../images/urgent.svg'
import warningIcon from '../../images/warning.svg'
import overdueIcon from '../../images/alarm.svg'
import styles from './Desk.module.scss'
import DeskItemLabel from './DeskItemLabel'

type propTypes = {
  task: ITask
  desk: IDesk
}

const DeskItem: FC<propTypes> = ({ task, desk }) => {
  const isOverdue = task.expirationDate
    ? +new Date(task.expirationDate) - +new Date() < 0
    : false

  return (
    <div
      className="task pb-2 pt-1"
      onDrop={(e) => dropHandler(e, desk, task)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      <div
        className={`${styles.draggable} px-6 pt-1 pb-3 break-words bg-zinc-100 rounded-md
          cursor-grab active:cursor-grabbing dark-theme dark:bg-dark-4`}
        draggable={!task.attached}
        onDragStart={(e) => dragStartHandler(e, desk, task)}
        onDragEnd={(e) => dragEndHandler(e)}
      >
        <div className={`pb-1 font-semibold ${task.description && 'border-b border-gray-400'}`}>{task.title}</div>
        {task.description && <div className="pl-2 py-1 mb-3 font-light text-sm">{task.description}</div>}
        {task.label === 'Срочно' && <DeskItemLabel icon={urgentIcon} text={task.label} className="bg-orange-500"/>}
        {task.label === 'Важно' && <DeskItemLabel icon={warningIcon} text={task.label} className="bg-red-500"/>}
        {isOverdue && <DeskItemLabel icon={overdueIcon} text="Просрочен" className="bg-blue-500"/>}
      </div>
    </div>
  )
}

export default memo(DeskItem)
