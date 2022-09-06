import { Dispatch, FC, SetStateAction } from 'react'
import ModalLayout from '../common/ModalLayout'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import ModalInput from '../common/ModalInput'
import { useStores } from '../../../hooks/useStores'

type propTypes = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}


const DeskModal: FC<propTypes> = ({ setIsModalOpen }) => {
  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>()
  const { deskStore } = useStores()

  const createDesk: SubmitHandler<FieldValues> = (d) => {
    deskStore.createDesk(d.title)
    setIsModalOpen(false)
  }

  return (
    <ModalLayout setIsModalOpen={setIsModalOpen} title="Создать новый стол">
      <form onSubmit={handleSubmit(createDesk)}>
        <div className="bg-gray-50 px-6 py-4 dark-theme dark:bg-dark-2">
          <ModalInput register={register} text="Название" name="title" autoFocus={true}/>
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
            Создать
          </button>
        </div>
      </form>
    </ModalLayout>
  )
}

export default DeskModal
