import findlyLogo from '@/shared/logo/findly-logo.png'
import s from './index.module.scss'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const HeaderLayoutWidget = memo(() => {
  return (
    <motion.header
      className={`${s.header} df aic cw`}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <motion.img
        src={findlyLogo}
        alt="Findly Logo"
        height={100}
        draggable={false}
        animate={{ opacity: 1, rotate: 17 }}
        transition={{ ease: 'easeOut', duration: 2 }}
        initial={{ opacity: 0 }}
      />
      <div>
        <Link to="/documentation">Docs</Link>
      </div>
    </motion.header>
  )
})
