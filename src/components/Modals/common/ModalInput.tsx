import { FC, useId } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type propTypes = {
  register: UseFormRegister<FieldValues>
  text: string
  name: string
  autoFocus?: boolean
  defaultValue?: string
}

const ModalInput: FC<propTypes> = ({ register, text, name, autoFocus = false, defaultValue }) => {
  const titleId = useId()

  return (
    <div className="mb-5 flex items-center">
      <label className="font-semibold text-sm mr-6" htmlFor={titleId}>{text}</label>
      <input
        type="text"
        id={titleId}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        className="input-field py-1 w-full"
        {...register(name, { required: 'Поле заголовок обязательно для заполнения', minLength: 1, maxLength: 100 })}
      />
    </div>
  )
}

export default ModalInput
