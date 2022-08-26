import { FC, memo } from 'react'

const Header: FC = () => {
  return (
    <header className="text-center text-2xl mb-3 py-4">
      Todo Desk
    </header>
  )
}

export default memo(Header)
