import { FC } from 'react'
import ModalInput from '../common/ModalInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useStores } from '../../../hooks/useStores'
import { addTaskModalPropsT } from './AddTaskModal'


const AddTaskModalForm: FC<addTaskModalPropsT> = ({ desk, setIsModalOpen }) => {
  const { register, handleSubmit } = useForm<FieldValues>()
  const { deskStore } = useStores()

  const addTask: SubmitHandler<FieldValues> = (d) => {
    setIsModalOpen(false)
    deskStore.createTask(desk, d.title, '', 'Обычный')
  }


  return (
    <form onSubmit={handleSubmit(addTask)}>
      <div className="flex flex-col px-6 py-4 bg-gray-50 dark-theme dark:bg-dark-2">
        <ModalInput register={register} text="Заголовок" name="title" autoFocus={true} />
        <textarea
          placeholder="Введите описание..."
          className="px-5 py-2 mb-5 border border-gray-200 rounded shadow-sm h-20 text-sm
              focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-dark-3"
        />
      </div>

      <div
        className="flex items-center justify-end px-5 py-3 bg-white border-t border-gray-200 rounded-b-lg
          dark-theme dark:bg-dark-1 dark:border-none"
      >
        <button
          className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded"
          type="submit"
        >
          Добавить
        </button>
      </div>
    </form>
  )
}

export default AddTaskModalForm
