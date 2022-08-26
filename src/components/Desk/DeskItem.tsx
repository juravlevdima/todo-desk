import { FC, DragEvent, memo } from 'react'
import { IDesk, ITask } from '../../types/desk.types'
import { useStores } from '../../hooks/useStores'

import styles from './Desk.module.scss'

type propTypes = {
  task: ITask
  desk: IDesk
}

const DeskItem: FC<propTypes> = ({ task, desk }) => {
  const { deskStore } = useStores()

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.currentTarget.classList.contains('task')) {
      e.currentTarget.classList.add(styles.drop)
    }
  }

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.drop)
  }

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk, task: ITask) => {
    deskStore.setCurrentDesk(desk)
    deskStore.setCurrentTask(task)
  }

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.drop)
  }

  const dropHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk, task: ITask ) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove(styles.drop)

    const dropIndex = desk.items.findIndex((it) => it.id === task.id)

    if (deskStore.currentDesk && deskStore.currentTask) {
      deskStore.deleteTask(deskStore.currentDesk, deskStore.currentTask.id)
      deskStore.addTask(desk, deskStore.currentTask, dropIndex + 1)
    }

    deskStore.setCurrentDesk(null)
    deskStore.setCurrentTask(null)
  }


  return (
    <div
      className="task text-center pb-2 pt-1"
      onDrop={(e) => dropHandler(e, desk, task)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      <div
        className={`${styles.draggable} px-8 border border-gray-600 cursor-grab active:cursor-grabbing`}
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
