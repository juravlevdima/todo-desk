import { FC } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { IDesk } from '../../types/desk.types'
import DeskItem from './DeskItem'
import { cardDragOverHandler, dropCardHandler } from './desk.handlers'

import styles from './Desk.module.scss'
import DeskHeader from './DeskHeader'

type propTypes = {
  desk: IDesk
}

const Desk: FC<propTypes> = ({ desk }) => {
  const controls = useDragControls()
  return (
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
        className="px-3 w-72 lg:w-80 xl:w-80"
        onDragOver={(e) => cardDragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, desk)}
      >
        <div className={`p-5 rounded-md shadow-lg bg-white dark-theme dark:bg-dark-3 ${styles.desk}`} >
          <DeskHeader desk={desk} controls={controls} />
          <div>
            {desk.items.map((task) => <DeskItem key={task.id} task={task} desk={desk}/>)}
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default Desk
