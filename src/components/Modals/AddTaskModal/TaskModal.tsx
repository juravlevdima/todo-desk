import { Dispatch, FC, SetStateAction } from 'react'
import { IDesk } from '../../../types/desk.types'
import TaskModalForm from './TaskModalForm'
import ModalLayout from '../common/ModalLayout'
import { useStores } from '../../../hooks/useStores'

export type TaskModalActionT = 'Добавить' | 'Сохранить'

type propTypes = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  desk: IDesk
  title: string
  action: TaskModalActionT
}

const TaskModal: FC<propTypes> = ({ setIsModalOpen, desk, title, action }) => {
  const { deskStore } = useStores()
  const defaultValues = deskStore.editableTask || undefined

  return (
    <ModalLayout setIsModalOpen={setIsModalOpen} title={title}>
      <TaskModalForm
        setIsModalOpen={setIsModalOpen}
        desk={desk}
        action={action}
        defaultValues={defaultValues}
        editableTaskId={defaultValues?.id}
      />
    </ModalLayout>
  )
}

export default TaskModal
