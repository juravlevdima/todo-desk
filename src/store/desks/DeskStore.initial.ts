import { IDesk } from '../../types/desk.types'
import { nanoid } from 'nanoid'

export const baseDesks: Array<IDesk> = [
  {
    id: nanoid(6),
    title: 'Инструкции',
    items: [
      { title: 'Передвинуть стол', description: 'Для того чтобы передвинуть стол, необходимо зажать иконку слева вверху',
        id: nanoid(6) },
      { title: 'Передвинуть задачу', description: 'Также можно передвинуть/поменять местами задачи, зажав карточку',
        id: nanoid(6) },
      { title: 'Добавить задачу', description: 'Для создания новой задачи необходимо нажать +',
        id: nanoid(6) },
    ]
  },
  { id: nanoid(6), title: 'Стол заданий',
    items: [
      { title: 'Срочная задача', id: nanoid(6), description: 'Задача может быть отмечена как срочная', label: 'Срочно' },
      { title: 'Важная задача', id: nanoid(6), description: 'Или как важная', label: 'Важно' },
      { title: 'Просроченная задача', id: nanoid(6), description: 'Просроченные задачи автоматически отмечаются',
        expirationDate: '2022-08-11' },
    ]
  },
  {
    id: nanoid(6),
    title: 'Дела на месяц',
    items: [{ title: 'Изучить HTML/CSS', id: nanoid(6) }, { title: 'Изучить JS', id: nanoid(6) }]
  },
]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const deskStoreInitialState = JSON.parse(localStorage.getItem('userdesks')) || baseDesks
