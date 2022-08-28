import { FC, useId } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type propTypes = {
  register: UseFormRegister<FieldValues>
  text: string
  name: string
  autoFocus?: boolean
}

const ModalInput: FC<propTypes> = ({ register, text, name, autoFocus = false }) => {
  const titleId = useId()

  return (
    <div className="mb-5 flex items-center">
      <label className="font-semibold text-sm text-gray-700 mr-6" htmlFor={titleId}>{text}</label>
      <input
        type="text"
        id={titleId}
        autoFocus={autoFocus}
        className="px-5 py-1 w-full border border-gray-200 rounded shadow-sm text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        {...register(name)}
      />
    </div>
  )
}

export default ModalInput
