import { FC } from 'react'
import { useStores } from '../../hooks/useStores'
import Desk from '../../components/Desk/Desk'
import { observer } from 'mobx-react-lite'
import { Reorder } from 'framer-motion'

const Main: FC = observer(() => {
  const { deskStore } = useStores()

  return (
    <div className="px-2 pt-5 pb-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-auto">
      <Reorder.Group
        onReorder={deskStore.updateDesksOrder.bind(deskStore)}
        values={deskStore.desks}
        axis="x"
        className="flex -mx-3"
      >
        {deskStore.desks.map((desk) => (
          !desk.isHidden && <Desk desk={desk} key={desk.id}/>
        ))}
      </Reorder.Group>
    </div>
  )
})

export default Main
