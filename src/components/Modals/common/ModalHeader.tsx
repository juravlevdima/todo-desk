import { Dispatch, FC, memo, SetStateAction } from 'react'
import closeIcon from '../../../images/close.svg'

type propTypes = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  title: string
}

const ModalHeader: FC<propTypes> = ({ setIsModalOpen, title }) => {
  return (
    <div
      className="flex justify-between px-6 py-4 border-b border-gray-200 rounded-t-lg
        bg-white dark-theme dark:bg-dark-1 dark:border-none"
    >
      <div className="font-semibold">{title}</div>
      <button
        className="h-6 w-6 hover:scale-125 transition duration-300"
        title="Закрыть"
        onClick={() => setIsModalOpen(false)}
      >
        <img className="rounded-md dark:bg-white" src={closeIcon} alt="close"/>
      </button>
    </div>
  )
}

export default memo(ModalHeader)
