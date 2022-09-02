import { autorun, makeAutoObservable } from 'mobx'
import { IDesk, ITask, IUpdateTask, TaskLabelsT } from '../../types/desk.types'
import { nanoid } from 'nanoid'
import { deskStoreInitialState } from './DeskStore.initial'


export default class DeskStore {
  currentDesk: null | IDesk = null
  currentTask: null | ITask = null
  desks: Array<IDesk> = []

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      this.desks = deskStoreInitialState
    })
  }

  saveDesksToLS() {
    localStorage.setItem('userdesks', JSON.stringify(this.desks))
  }

  updateDesks(desks: Array<IDesk>) {
    this.desks = desks
    this.saveDesksToLS()
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
    this.saveDesksToLS()
  }

  createTask(desk: IDesk, title: string, description: string, label: TaskLabelsT, expirationDate?: string) {
    const task: ITask = {
      id: nanoid(6),
      title,
      description,
      label,
      inProgress: false,
      isCompleted: false,
      pinned: false,
      createdDate: new Date(),
      expirationDate: expirationDate || null
    }

    this.addTask(desk, task)
  }

  deleteTask(desk: IDesk, taskId: string) {
    const deskIndex = this.desks.findIndex((it) => it.id === desk.id)
    this.desks[deskIndex] = { ...desk, items: desk.items.filter((it) => it.id !== taskId) }
    this.saveDesksToLS()
  }

  updateTask(taskId: string, desk: IDesk, newData: IUpdateTask) {
    const deskIndex = this.desks.findIndex((it) => it.id === desk.id)
    this.desks[deskIndex] = {
      ...desk, items: desk.items.map((task) => {
        return task.id === taskId
          ? { ...task, ...newData }
          : task
      })
    }
    this.saveDesksToLS()
  }

  setCurrentDesk(desk: IDesk | null) {
    this.currentDesk = desk
  }

  setCurrentTask(task: ITask | null) {
    this.currentTask = task
  }
}
