import { FC, DragEvent, useState } from 'react'
import { AnimatePresence, Reorder, useDragControls } from 'framer-motion'
import { IDesk } from '../../types/desk.types'
import DeskItem from './DeskItem'
import { cardDragOverHandler, dropCardHandler } from './desk.handlers'

import styles from './Desk.module.scss'
import DeskHeader from './DeskHeader'
import TaskModal from '../Modals/AddTaskModal/TaskModal'

type propTypes = {
  desk: IDesk
}

const Desk: FC<propTypes> = ({ desk }) => {
  const controls = useDragControls()
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  return (
    <>
      <Reorder.Item
        value={desk}
        dragListener={false}
        dragControls={controls}
        whileDrag={{
          scale: 1.05,
          cursor: 'grabbing',
        }}
      >
        <div
          className="px-3 w-72 lg:w-80"
          onDragOver={(e) => cardDragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, desk)}
        >
          <div className={`p-5 rounded-md shadow-lg bg-white dark-theme dark:bg-dark-3 ${styles.desk}`}>
            <DeskHeader
              desk={desk}
              controls={controls}
              onDrop={(e: DragEvent<HTMLDivElement>) => dropCardHandler(e, desk, 0)}
            />
            <div>
              {desk.items.map((task) => (
                <DeskItem
                  key={task.id}
                  task={task}
                  desk={desk}
                  setIsEditOpen={setIsEditOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </Reorder.Item>

      <AnimatePresence>
        {isEditOpen && <TaskModal setIsModalOpen={setIsEditOpen} desk={desk} title="Редактировать" action="Сохранить"/>}
      </AnimatePresence>
    </>
  )
}

export default Desk
