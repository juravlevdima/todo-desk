import { FC, useId } from 'react'
import ModalInput from '../common/ModalInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useStores } from '../../../hooks/useStores'
import { addTaskModalPropsT } from './AddTaskModal'
import RadioButton from '../../common/RadioButton'


const AddTaskModalForm: FC<addTaskModalPropsT> = ({ desk, setIsModalOpen }) => {
  const { register, handleSubmit } = useForm<FieldValues>()
  const { deskStore } = useStores()
  const dateInputId = useId()

  const addTask: SubmitHandler<FieldValues> = (d) => {
    setIsModalOpen(false)
    deskStore.createTask(desk, d.title, d.description, d.label, d.expirationDate)
  }


  return (
    <form onSubmit={handleSubmit(addTask)}>
      <div className="flex flex-col px-6 py-4 bg-gray-50 dark-theme dark:bg-dark-2">
        <ModalInput register={register} text="Заголовок" name="title" autoFocus={true} />
        <textarea
          placeholder="Введите описание..."
          className="input-field py-2 mb-5 h-20"
          {...register('description')}
        />
        <div className="mb-5 flex items-center justify-between">
          <label className="font-semibold text-sm mr-6 whitespace-nowrap" htmlFor={dateInputId}>Дата завершения</label>
          <input
            type="date"
            id={dateInputId}
            className="input-field py-1 w-full"
            {...register('expirationDate')}
          />
        </div>
        <div className="flex items-center">
          <div className="font-semibold text-sm mr-10">Метка:</div>
          <RadioButton name="label" text="Обычный" register={register} defaultChecked={true}/>
          <RadioButton name="label" text="Важно" register={register}/>
          <RadioButton name="label" text="Срочно" register={register}/>
        </div>
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
