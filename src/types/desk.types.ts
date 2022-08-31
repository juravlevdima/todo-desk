export type TaskLabelsT = 'Важно' | 'Срочно' | 'Обычный'

export interface ITask {
  id: string
  title: string
  description?: string
  label?: TaskLabelsT
  inProgress?: boolean
  isCompleted?: boolean
  attached?: boolean
  createdDate?: Date
  expirationDate?: Date | null
}

export interface IDesk {
  id: string
  title: string
  items: Array<ITask>
  isHidden?: boolean
}
