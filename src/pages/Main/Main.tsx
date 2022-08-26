import { FC } from 'react'
import { useStores } from '../../hooks/useStores'
import Desk from '../../components/Desk/Desk'
import { observer } from 'mobx-react-lite'

const Main: FC = observer(() => {
  const { deskStore } = useStores()

  return (
    <div className="container">
      <div className="text-center text-2xl mb-3 py-4">Todo Desk</div>
      <div className="flex justify-between">
        {
          deskStore.desks.map((desk) => <Desk key={desk.id} desk={desk}/>)
        }
      </div>
    </div>
  )
})

export default Main
