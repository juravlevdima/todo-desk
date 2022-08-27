import { FC } from 'react'
import { useStores } from '../../hooks/useStores'
import Desk from '../../components/Desk/Desk'
import { observer } from 'mobx-react-lite'

const Main: FC = observer(() => {
  const { deskStore: { desks }} = useStores()

  return (
    <div className="container">
      <div className="flex justify-between">
        {
          desks.map((desk) => <Desk key={desk.id} desk={desk}/>)
        }
      </div>
    </div>
  )
})

export default Main
