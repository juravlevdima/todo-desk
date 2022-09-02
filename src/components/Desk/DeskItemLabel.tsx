import { FC, memo } from 'react'

type propTypes = {
  icon: string,
  text: string,
  className?: string
}

const DeskItemLabel: FC<propTypes> = ({ icon, text, className }) => {
  return (
    <div
      className={`flex px-2 py-1 mb-2 rounded-lg w-28 text-center
        last:mb-0 text-sm tracking-tighter ${className}`}
    >
      <img width="18px" src={icon} alt="!"/>
      <div className="ml-2 text-white">{text}</div>
    </div>
  )
}

export default memo(DeskItemLabel)
