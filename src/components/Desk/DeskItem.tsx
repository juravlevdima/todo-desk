import { FC, DragEvent } from 'react'
import { IDesk, ITask } from '../../types/desk.types'
import { useStores } from '../../hooks/useStores'
import { observer } from 'mobx-react-lite'

type propTypes = {
  task: ITask
  desk: IDesk
}

const DeskItem: FC<propTypes> = observer(({ task, desk }) => {
  const { deskStore } = useStores()

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.currentTarget.classList.contains('task')) {
      e.currentTarget.style.boxShadow = '0 4px 3px gray'
    }
  }

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = 'none'
  }

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk, task: ITask) => {
    deskStore.setCurrentDesk(desk)
    deskStore.setCurrentTask(task)
  }

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = 'none'
  }

  const dropHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk ) => {
    e.preventDefault()
    e.currentTarget.style.boxShadow = 'none'

    if (deskStore.currentDesk && deskStore.currentTask && desk.id !== deskStore.currentDesk.id) {
      deskStore.addTask(desk, deskStore.currentTask)
      deskStore.deleteTask(deskStore.currentDesk, deskStore.currentTask.id)
    }
  }

  return (
    <div
      className="task text-center px-36 border border-gray-600 mb-2 cursor-grab active:cursor-grabbing"
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, desk, task)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, desk)}
    >
      {task.title}
    </div>
  )
})

export default DeskItem
