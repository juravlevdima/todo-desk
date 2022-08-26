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

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const currentIndex = deskStore.currentDesk?.items.findIndex((it) => it.id === deskStore.currentTask?.id)

    if (currentIndex) {
      deskStore.currentDesk?.items.splice(currentIndex, 1)
    }

    const dropIndex = desk?.items.findIndex((it) => it.id === deskStore.currentTask?.id)
    if (dropIndex && deskStore.currentTask) {
      deskStore.currentDesk?.items.splice(dropIndex + 1, 0, deskStore.currentTask)
    }

    deskStore.updateDesks(deskStore.desks.map((it) => {
      if (it.id === desk.id) {
        return desk
      } else if (it.id === deskStore.currentDesk?.id) {
        return deskStore.currentDesk
      }
      return it
    }))
  }

  return (
    <div
      className="task text-center px-36 border border-gray-600 mb-2 cursor-grab active:cursor-grabbing"
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, desk, task)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragOverHandler(e/* , desk, task */)}
      onDrop={(e) => dropHandler(e)}
    >
      {task.title}
    </div>
  )
})

export default DeskItem
