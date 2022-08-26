import { DragEvent, FC, memo } from 'react'
import { IDesk } from '../../types/desk.types'
import DeskItem from './DeskItem'
import { useStores } from '../../hooks/useStores'

type propTypes = {
  desk: IDesk
}

const Desk: FC<propTypes> = ({ desk }) => {
  const { deskStore } = useStores()

  const dropCardHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk) => {
    e.preventDefault()
    if (deskStore.currentDesk && deskStore.currentTask) {
      deskStore.deleteTask(deskStore.currentDesk, deskStore.currentTask.id)
      deskStore.addTask(desk, deskStore.currentTask)
    }

    deskStore.setCurrentDesk(null)
    deskStore.setCurrentTask(null)
  }

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      className="border-2 border-black rounded-md py-5 px-5 w-96"
      onDragOver={(e) => dragOverHandler(e)}
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
