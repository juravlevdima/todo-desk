import { FC, useId } from 'react'
import { IDesk, IUpdateDesk } from '../../types/desk.types'

type propTypes = {
  desk: IDesk
  updateDeskData: (id: string, data: IUpdateDesk) => void
}

const AsideMenuItem: FC<propTypes> = ({ desk, updateDeskData }) => {
  const checkboxId = useId()

  return (
    <li className="text-2xl sm:text-lg mb-2">
      <input
        type="checkbox"
        id={checkboxId}
        className="mr-3 cursor-pointer"
        defaultChecked={!desk.isHidden}
        onChange={(e) => updateDeskData(desk.id, { isHidden: !e.target.checked })}
      />
      <label htmlFor={checkboxId} className="cursor-pointer">{desk.title}</label>
    </li>
  )
}

export default AsideMenuItem
