import { IDesk } from '../../types/desk.types'
import { nanoid } from 'nanoid'

export const baseDesks: Array<IDesk> = [
  {
    id: nanoid(6),
    title: 'Инструкции',
    items: [
      { title: 'Передвинуть стол', description: 'Для того чтобы передвинуть стол, необходимо зажать иконку слева вверху',
        id: nanoid(6), pinned: false, label: 'Обычный', inProgress: false, isCompleted: false },
      { title: 'Передвинуть задачу', description: 'Также можно передвинуть/поменять местами задачи, зажав карточку',
        id: nanoid(6), pinned: false, label: 'Обычный', inProgress: false, isCompleted: false },
      { title: 'Добавить задачу', description: 'Для создания новой задачи необходимо нажать +',
        id: nanoid(6), pinned: false, label: 'Обычный', inProgress: false, isCompleted: false },
    ]
  },
  { id: nanoid(6), title: 'Стол заданий',
    items: [
      { title: 'Срочная задача', id: nanoid(6), description: 'Задача может быть отмечена как срочная',
        label: 'Срочно', pinned: false, inProgress: false, isCompleted: false },
      { title: 'Важная задача', id: nanoid(6), description: 'Или как важная', label: 'Важно', pinned: false,
        inProgress: false, isCompleted: false },
      { title: 'Просроченная задача', id: nanoid(6), description: 'Просроченные задачи автоматически отмечаются',
        expirationDate: '2022-08-11', pinned: false, label: 'Обычный', inProgress: false, isCompleted: false },
    ]
  },
  {
    id: nanoid(6),
    title: 'Двойной клик',
    items: [
      { title: 'Переименовать стол', description: 'Можно кликнув дважды на заголовок', id: nanoid(6), pinned: true,
        label: 'Обычный', inProgress: false, isCompleted: false },
      { title: 'Можно закрепить задачу', id: nanoid(6), pinned: true,
        label: 'Обычный', inProgress: false, isCompleted: false },
    ]
  },
]

// @ts-ignore
export const deskStoreInitialState = JSON.parse(localStorage.getItem('userdesks')) || baseDesks
