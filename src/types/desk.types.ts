export interface ITask {
  id: string
  title: string
  description?: string
  labels?: 'Важно' | 'Срочно' | 'День рождения' | 'Обычный'
  inProgress?: boolean
  isCompleted?: boolean
  attached?: boolean
  createdDate?: Date
  expirationDate?: Date
}

export interface IDesk {
  id: string
  title: string
  items: Array<ITask>
  isHidden?: boolean
}
