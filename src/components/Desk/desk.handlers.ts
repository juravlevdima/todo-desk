import { DragEvent } from 'react'
import { IDesk, ITask } from '../../types/desk.types'
import { store } from '../../store'
import styles from './Desk.module.scss'

const { deskStore } = store

export const dropCardHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk) => {
  e.preventDefault()
  if (deskStore.currentDesk && deskStore.currentTask) {
    deskStore.deleteTask(deskStore.currentDesk, deskStore.currentTask.id)
    deskStore.addTask(desk, deskStore.currentTask)
  }

  deskStore.setCurrentDesk(null)
  deskStore.setCurrentTask(null)
}

export const cardDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault()
}

export const dragOverHandler = (e: DragEvent<HTMLDivElement>, pin: boolean) => {
  e.preventDefault()
  if (e.currentTarget.classList.contains('task') && !pin) {
    e.currentTarget.classList.add(styles.drop)
  }
}

export const dragStartHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk, task: ITask) => {
  deskStore.setCurrentDesk(desk)
  deskStore.setCurrentTask(task)
}

export const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
  e.currentTarget.classList.remove(styles.drop)
}

export const dropHandler = (e: DragEvent<HTMLDivElement>, desk: IDesk, task: ITask, pin: boolean ) => {
  e.preventDefault()
  if (pin) return

  e.stopPropagation()
  e.currentTarget.classList.remove(styles.drop)

  const dropIndex = desk.items.findIndex((it) => it.id === task.id)

  if (deskStore.currentDesk && deskStore.currentTask) {
    deskStore.deleteTask(deskStore.currentDesk, deskStore.currentTask.id)
    deskStore.addTask(desk, deskStore.currentTask, dropIndex + 1)
  }

  deskStore.setCurrentDesk(null)
  deskStore.setCurrentTask(null)
}
