export type TaskLabelsT = 'Важно' | 'Срочно' | 'Обычный'

export interface ITask {
  id: string
  title: string
  description?: string
  label: TaskLabelsT
  inProgress: boolean
  isCompleted: boolean
  pinned: boolean
  createdDate?: Date
  expirationDate?: string | null
}

export interface IDesk {
  id: string
  title: string
  items: Array<ITask>
  isHidden?: boolean
}

export interface IUpdateTask {
  title?: string
  description?: string
  label?: TaskLabelsT
  inProgress?: boolean
  isCompleted?: boolean
  pinned?: boolean
  expirationDate?: string | null
}

export interface IUpdateDesk {
  title?: string
  isHidden?: boolean
}
