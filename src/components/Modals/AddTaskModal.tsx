import { Dispatch, FC, SetStateAction, useId, useState } from 'react'
import { motion } from 'framer-motion'
import closeIcon from '../../images/close.svg'
import { useStores } from '../../hooks/useStores'
import { IDesk, ITask } from '../../types/desk.types'
import { nanoid } from 'nanoid'

type propTypes = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  desk: IDesk
}

const AddTaskModal: FC<propTypes> = ({ setIsModalOpen, desk }) => {
  const titleId = useId()
  const { deskStore } = useStores()

  const [title, setTitle] = useState('')

  const addTask = () => {
    const task: ITask = {
      id: nanoid(6),
      title,
    }
    setIsModalOpen(false)
    deskStore.addTask(desk, task)
  }

  return (
    <>
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-0 z-40 bg-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 0, x: '-50%' }}
        animate={{ opacity: 1, y: '-50%', x: '-50%' }}
        exit={{ opacity: 0 }}
        className="absolute top-1/2 left-1/2 z-50 bg-white flex flex-col rounded-lg border border-gray-300
          shadow-xl w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl"
      >
        <div
          className="flex justify-between px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <p className="font-semibold text-gray-800">Добавить задачу</p>
          <button
            className="h-6 w-6 hover:scale-125 transition duration-300"
            title="Закрыть"
            onClick={() => setIsModalOpen(false)}
          >
            <img src={closeIcon} alt="close"/>
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 bg-gray-50">
          <div className="mb-5 flex items-center">
            <label className="font-semibold text-sm text-gray-700 mr-6" htmlFor={titleId}>Заголовок</label>
            <input
              type="text"
              id={titleId}
              className="px-5 py-1 w-full border border-gray-200 rounded shadow-sm text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Введите описание..."
            className="px-5 py-2 mb-5 border border-gray-200 rounded shadow-sm h-20 text-sm
              focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center justify-end p-5 bg-white border-t border-gray-200 rounded-b-lg">
          <button
            className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded"
            onClick={addTask}
          >
            Добавить
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default AddTaskModal
