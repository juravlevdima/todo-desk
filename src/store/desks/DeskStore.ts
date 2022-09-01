import { makeAutoObservable } from 'mobx'
import { IDesk, ITask, TaskLabelsT } from '../../types/desk.types'
import { nanoid } from 'nanoid'

export default class DeskStore {
  currentDesk: null | IDesk = null
  currentTask: null | ITask = null
  desks: Array<IDesk> = [
    { id: nanoid(6), title: 'first desk',
      items: [
        { title: 'first task', id: nanoid(6), description: 'описание таска qwerty', label: 'Срочно' },
        { title: 'второй', id: nanoid(6), description: 'йцуке фывап ячсми', label: 'Важно' },
        { title: 'Просроченный', id: nanoid(6), description: 'qwrty adfg zxcvb ghlwqwe', expirationDate: '2022-08-11' },
      ]
    },
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
        { title: '5 task', id: nanoid(6) },
        { title: '6 task', id: nanoid(6) },
        { title: '7 task', id: nanoid(6) },
      ]
    },
    { id: nanoid(6), title: '4 desk', items: [{ title: '4 d task', id: nanoid(6) }] },
  ]

  constructor() {
    makeAutoObservable(this)
  }

  updateDesks(desks: Array<IDesk>) {
    this.desks = desks
  }

  addTask(desk: IDesk, task: ITask, idx?: number) {
    const deskIndex = this.desks.findIndex((it) => it.id === desk.id)
    const updatedItems = desk.items.filter((it) => it.id !== task.id)
    if (idx || idx === 0) {
      updatedItems.splice(idx, 0, task)
    } else {
      updatedItems.push(task)
    }
    this.desks[deskIndex] = { ...desk, items: updatedItems }
  }

  createTask(desk: IDesk, title: string, description: string, label: TaskLabelsT, expirationDate?: string) {
    const task: ITask = {
      id: nanoid(6),
      title,
      description,
      label,
      inProgress: false,
      isCompleted: false,
      attached: false,
      createdDate: new Date(),
      expirationDate: expirationDate || null
    }

    this.addTask(desk, task)
  }

  deleteTask(desk: IDesk, taskId: string) {
    const deskIndex = this.desks.findIndex((it) => it.id === desk.id)
    this.desks[deskIndex] = { ...desk, items: desk.items.filter((it) => it.id !== taskId) }
  }

  setCurrentDesk(desk: IDesk | null) {
    this.currentDesk = desk
  }

  setCurrentTask(task: ITask | null) {
    this.currentTask = task
  }
}
