import { useState } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'
//ICONS
import SettingsIcon from '@mui/icons-material/Settings'
//COMPONENTS
import { SettingsModal } from './ui/modal'

export const SettingsLayoutWidget = observer(() => {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  return (
    <>
      <motion.div
        className={`${s.settings} df fdc`}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <button className="df jcc aic" onClick={() => setIsSettingsActive(true)}>
          <SettingsIcon style={{ fontSize: '36px' }} />
        </button>
      </motion.div>
      {isSettingsActive && <SettingsModal setIsActive={setIsSettingsActive} />}
    </>
  )
})
