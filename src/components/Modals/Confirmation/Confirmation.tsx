import { Dispatch, FC, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import ModalHeader from '../common/ModalHeader'

type propTypes = {
  text: string,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  confirmFunc: () => void
}

const Confirmation: FC<propTypes> = ({ text, setIsModalOpen, confirmFunc }) => {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-0 z-40 bg-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 0, x: '-50%' }}
        animate={{ opacity: 1, y: '-50%', x: '-50%' }}
        exit={{ opacity: 0 }}
        className="absolute top-1/2 left-1/2 z-50 flex flex-col rounded-lg
          shadow-xl w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl"
      >
        <ModalHeader setIsModalOpen={setIsModalOpen} title={text} />
      </motion.div>
    </>
  )
}

export default Confirmation