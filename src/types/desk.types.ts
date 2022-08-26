export interface ITask {
  id: string
  title: string
}

export interface IDesk {
  id: string
  title: string
  items: Array<ITask>
}
