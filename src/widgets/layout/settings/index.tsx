import { useState } from 'react'
import s from './index.module.scss'
import SettingsIcon from '@mui/icons-material/Settings'
import { ModalUi } from '@/shared/ui/modal'

export const SettingsLayoutWidget = () => {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  return (
    <>
      <div className={`${s.settings} df fdc`}>
        <button className="df jcc aic" onClick={() => setIsSettingsActive(true)}>
          <SettingsIcon style={{ fontSize: '36px' }} />
        </button>
      </div>
      {isSettingsActive && <ModalUi off={setIsSettingsActive}>Material</ModalUi>}
    </>
  )
}
