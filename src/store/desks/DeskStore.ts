import { makeAutoObservable } from 'mobx'
import { IDesk, ITask } from '../../types/desk.types'
import { nanoid } from 'nanoid'

export default class DeskStore {
  desks: Array<IDesk> = [
    { id: nanoid(6), title: 'first desk', items: [{ title: 'first task', id: nanoid(6) }] },
    {
      id: nanoid(6),
      title: 'second desk',
      items: [{ title: 'sec task 1', id: nanoid(6) }, { title: 'sec task 2', id: nanoid(6) }]
    },
    {
      id: nanoid(6),
      title: 'third desk',
      items: [
        { title: '3 task', id: nanoid(6) },
        { title: '4 task', id: nanoid(6) },
        { title: '5 task', id: nanoid(6) }
      ]
    }
  ]

  currentDesk: null | IDesk = null
  currentTask: null | ITask = null

  constructor() {
    makeAutoObservable(this)
  }

  updateDesks(desks: Array<IDesk>) {
    this.desks = desks
  }

  setCurrentDesk(desk: IDesk) {
    this.currentDesk = desk
  }

  setCurrentTask(task: ITask) {
    this.currentTask = task
  }
}
