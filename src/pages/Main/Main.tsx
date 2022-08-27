import { FC } from 'react'
import { useStores } from '../../hooks/useStores'
import Desk from '../../components/Desk/Desk'
import { observer } from 'mobx-react-lite'
import { Reorder } from 'framer-motion'

const Main: FC = observer(() => {
  const { deskStore } = useStores()

  return (
    <div className="container">
      <Reorder.Group
        onReorder={deskStore.updateDesks.bind(deskStore)}
        values={deskStore.desks} axis="x"
        className="flex justify-between"
      >
        {deskStore.desks.map((desk) => (
          <Desk desk={desk} key={desk.id}/>
        ))}
      </Reorder.Group>
    </div>
  )
})

export default Main
