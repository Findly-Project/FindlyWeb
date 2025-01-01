import { useState } from 'react'
import s from './index.module.scss'
import SettingsIcon from '@mui/icons-material/Settings'
import { ModalUi } from '@/shared/ui/modal'
import { params } from '@/shared/store/details/parameters'
import { RangeInputUi } from '@/shared/ui/input/range'
import { observer } from 'mobx-react-lite'

export const SettingsLayoutWidget = observer(() => {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const {
    $ms: { ms, setMs },
  } = params
  return (
    <>
      <div className={`${s.settings} df fdc`}>
        <button className="df jcc aic" onClick={() => setIsSettingsActive(true)}>
          <SettingsIcon style={{ fontSize: '36px' }} />
        </button>
      </div>
      {isSettingsActive && (
        <ModalUi off={setIsSettingsActive}>
          <div className="flex fdc">
            <p>Max size: {ms}</p>
            <RangeInputUi max={40} value={ms} onChange={setMs} />
          </div>
        </ModalUi>
      )}
    </>
  )
})
