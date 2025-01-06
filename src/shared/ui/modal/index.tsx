import { motion } from 'framer-motion'
import s from './index.module.scss'

interface ModalUiProps {
  off: (_: boolean) => void
  children: React.ReactNode
}

export const ModalUi = ({ off, children, ...props }: ModalUiProps) => {
  return (
    <div className={`${s.modalBack} df jcc aic`} onClick={() => off(false)}>
      <motion.div
        className={`${s.modalContent}`}
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  )
}
