import { FC, memo } from 'react'
import { IDesk, ITask } from '../../types/desk.types'
import { dragEndHandler, dragOverHandler, dragStartHandler, dropHandler } from './desk.handlers'
import DeskItemLabel from './DeskItemLabel'
import { useStores } from '../../hooks/useStores'

import urgentIcon from '../../images/urgent.svg'
import warningIcon from '../../images/warning.svg'
import overdueIcon from '../../images/alarm.svg'
import delIcon from '../../images/delete-icon.svg'
import editIcon from '../../images/edit.svg'
import styles from './Desk.module.scss'

type propTypes = {
  task: ITask
  desk: IDesk
}

const DeskItem: FC<propTypes> = ({ task, desk }) => {
  const { deskStore } = useStores()

  const isOverdue = task.expirationDate
    ? +new Date(task.expirationDate) - +new Date() < 0
    : false

  const deleteHandler = () => {
    if (window.confirm('Подтвердите удаление')) {
      deskStore.deleteTask(desk, task.id)
    }
  }

  return (
    <div
      className="task pb-2 pt-1 relative select-none"
      onDrop={(e) => dropHandler(e, desk, task, task.pinned)}
      onDragOver={(e) => dragOverHandler(e, task.pinned)}
      onDragLeave={(e) => dragEndHandler(e)}
    >
      <div
        draggable={!task.pinned}
        onDragStart={(e) => dragStartHandler(e, desk, task)}
        onDragEnd={(e) => dragEndHandler(e)}
        className={`px-6 pt-1 pb-3 break-words bg-zinc-100 rounded-md dark-theme dark:bg-dark-4
          ${!task.pinned && `cursor-grab active:cursor-grabbing ${styles.draggable}`}`}
      >
        <div className={`pb-1 font-semibold ${task.description && 'border-b border-gray-400'}`}>{task.title}</div>
        {task.description && <div className="pl-2 py-1 mb-2 font-light text-sm">{task.description}</div>}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="opacity-60 hover:opacity-100 p-1 mr-1"
            >
              <img src={editIcon} alt="Edit"/>
            </button>
            <button
              onClick={deleteHandler}
              className="opacity-60 hover:opacity-100 p-1"
            >
              <img src={delIcon} alt="Delete"/>
            </button>
          </div>
          <div>
            {task.label === 'Срочно' && <DeskItemLabel icon={urgentIcon} text={task.label} className="bg-orange-500"/>}
            {task.label === 'Важно' && <DeskItemLabel icon={warningIcon} text={task.label} className="bg-red-500"/>}
            {isOverdue && <DeskItemLabel icon={overdueIcon} text="Просрочен" className="bg-blue-500"/>}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-1">
        <input
          type="checkbox"
          defaultChecked={task.pinned}
          className="pin"
          onChange={() => { deskStore.updateTask(task.id, desk, { pinned: !task.pinned }) }}
        />
      </div>
    </div>
  )
}

export default memo(DeskItem)
