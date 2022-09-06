import { autorun, makeAutoObservable } from 'mobx'
import { IDesk, ITask, IUpdateDesk, IUpdateTask, TaskLabelsT } from '../../types/desk.types'
import { nanoid } from 'nanoid'
import { deskStoreInitialState } from './DeskStore.initial'


export default class DeskStore {
  currentDesk: null | IDesk = null
  currentTask: null | ITask = null
  editableTask: null | ITask = null
  desks: Array<IDesk> = []

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      this.desks = deskStoreInitialState
    })
  }

  private saveDesksToLS(): void {
    localStorage.setItem('userdesks', JSON.stringify(this.desks))
  }


  // --------------- Desk methods ---------------


  createDesk(title: string) {
    const newDesk = {
      id: nanoid(6),
      title,
      items: [],
      isHidden: false
    }
    this.desks.push(newDesk)
    this.saveDesksToLS()
  }

  updateDesksOrder(desks: Array<IDesk>) {
    this.desks = desks
    this.saveDesksToLS()
  }

  updateDeskData(id: string, data: IUpdateDesk) {
    this.desks = this.desks.map((desk) => desk.id === id ? { ...desk, ...data } : desk)
    this.saveDesksToLS()
  }

  deleteDesk(id: string) {
    this.desks = this.desks.filter((desk) => desk.id !== id)
    this.saveDesksToLS()
  }

  setCurrentDesk(desk: IDesk | null) {
    this.currentDesk = desk
  }


  // --------------- Task methods ---------------


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
    this.editableTask = null
    this.saveDesksToLS()
  }

  setCurrentTask(task: ITask | null) {
    this.currentTask = task
  }

  setEditableTask(deskId: string | null, taskId: string | null) {
    const desk = this.desks.find((it) => it.id === deskId)
    this.editableTask = desk?.items.find((task) => task.id === taskId) || null
  }
}
