import { FC, useId } from 'react'
import { IDesk, IUpdateDesk } from '../../types/desk.types'
import delIcon from '../../images/delete-icon.svg'

type propTypes = {
  desk: IDesk
  updateDeskData: (id: string, data: IUpdateDesk) => void
  deleteDesk: (id: string) => void
}

const AsideMenuItem: FC<propTypes> = ({ desk, updateDeskData, deleteDesk }) => {
  const checkboxId = useId()

  const deleteHandler = () => {
    if (window.confirm('Подтвердите удаление')) {
      deleteDesk(desk.id)
    }
  }

  return (
    <li className="text-2xl sm:text-lg mb-2 flex">
      <input
        type="checkbox"
        id={checkboxId}
        className="mr-3 cursor-pointer"
        defaultChecked={!desk.isHidden}
        onChange={(e) => updateDeskData(desk.id, { isHidden: !e.target.checked })}
      />
      <label htmlFor={checkboxId} className="cursor-pointer break-all">{desk.title}</label>
      <button
        className="opacity-60 hover:opacity-100 pl-3 shrink-0"
        onClick={deleteHandler}
      >
        <img src={delIcon} alt="Delete"/>
      </button>
    </li>
  )
}

export default AsideMenuItem
