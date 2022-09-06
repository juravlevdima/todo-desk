import { Dispatch, FC, SetStateAction, useEffect, useId } from 'react'
import ModalInput from '../common/ModalInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useStores } from '../../../hooks/useStores'
import RadioButton from '../../common/RadioButton'
import { IDesk, IUpdateTask } from '../../../types/desk.types'
import { TaskModalActionT } from './TaskModal'

type propTypes = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  desk: IDesk
  action: TaskModalActionT
  defaultValues?: IUpdateTask
  editableTaskId?: string
}

const TaskModalForm: FC<propTypes> = ({ setIsModalOpen, desk, action, defaultValues, editableTaskId }) => {
  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>()
  const { deskStore } = useStores()
  const dateInputId = useId()

  const submitTask: SubmitHandler<FieldValues> = (d) => {
    setIsModalOpen(false)
    if (action === 'Добавить') {
      deskStore.createTask(desk, d.title, d.description, d.label, d.expirationDate)
    } else if (action === 'Сохранить' && editableTaskId) {
      deskStore.updateTask(editableTaskId, desk, { ...d })
    }
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <form onSubmit={handleSubmit(submitTask)}>
      <div className="flex flex-col px-6 py-4 bg-gray-50 dark-theme dark:bg-dark-2">
        <ModalInput
          register={register}
          text="Заголовок"
          name="title"
          autoFocus={true}
          defaultValue={defaultValues?.title}
        />
        <textarea
          placeholder="Введите описание... (Максимум 300 символов)"
          className="input-field py-2 mb-5 h-20"
          maxLength={300}
          defaultValue={defaultValues?.description}
          {...register('description', { maxLength: 300 })}
        />
        <div className="mb-5 flex items-center justify-between">
          <label className="font-semibold text-sm mr-6 whitespace-nowrap" htmlFor={dateInputId}>Дата завершения</label>
          <input
            type="date"
            id={dateInputId}
            // @ts-ignore
            defaultValue={defaultValues?.expirationDate}
            className="input-field py-1 w-full"
            {...register('expirationDate')}
          />
        </div>
        <div className="flex flex-wrap items-center">
          <div className="font-semibold text-sm mr-10">Метка:</div>
          <RadioButton
            name="label"
            text="Обычный"
            register={register}
            defaultChecked={defaultValues?.label === 'Обычный' || !defaultValues?.label}/>
          <RadioButton name="label" text="Важно" register={register} defaultChecked={defaultValues?.label === 'Важно'}/>
          <RadioButton name="label" text="Срочно" register={register} defaultChecked={defaultValues?.label === 'Срочно'}/>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-5 py-3 bg-white border-t border-gray-200 rounded-b-lg
          dark-theme dark:bg-dark-1 dark:border-none"
      >
        <div className="text-red-500">
          {errors?.title?.message && String(errors.title.message)}
        </div>
        <button
          className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded"
          type="submit"
        >
          {action}
        </button>
      </div>
    </form>
  )
}

export default TaskModalForm
