import { FC, useId } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type propTypes = {
  text: string
  name: string
  register: UseFormRegister<FieldValues>
  defaultChecked?: boolean
}

const RadioButton: FC<propTypes> = ({ text, name, register, defaultChecked = false }) => {
  const btnId = useId()

  return (
    <>
      <input
        id={btnId}
        type="radio"
        value={text}
        className="inline-flex mr-1 cursor-pointer"
        {...register(name)}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={btnId} className="cursor-pointer text-sm mr-5 last:mr-0">
        {text}
      </label>
    </>
  )
}

export default RadioButton
