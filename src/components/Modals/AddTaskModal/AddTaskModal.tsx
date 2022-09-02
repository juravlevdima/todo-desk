import { Dispatch, FC, SetStateAction } from 'react'
import { IDesk } from '../../../types/desk.types'
import AddTaskModalForm from './AddTaskModalForm'
import ModalLayout from '../common/ModalLayout'

export type addTaskModalPropsT = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  desk: IDesk
}

const AddTaskModal: FC<addTaskModalPropsT> = ({ setIsModalOpen, desk }) => {
  return (
    <ModalLayout setIsModalOpen={setIsModalOpen} title="Добавить задачу">
      <AddTaskModalForm setIsModalOpen={setIsModalOpen} desk={desk}/>
    </ModalLayout>
  )
}

export default AddTaskModal
