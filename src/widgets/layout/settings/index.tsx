import { useState } from 'react'
import s from './index.module.scss'
import SettingsIcon from '@mui/icons-material/Settings'
import { ModalUi } from '@/shared/ui/modal'
import { params } from '@/shared/store/details/parameters'
import { RangeInputUi } from '@/shared/ui/input/range'
import { observer } from 'mobx-react-lite'
import { Switch } from '@mui/material'

export const SettingsLayoutWidget = observer(() => {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const {
    $ms: { ms, setMs },
    $pf: { pf, setPf },
    $nf: { nf, setNf },
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
          <div className="df fdc">
            <p>Max size: {ms}</p>
            <RangeInputUi max={40} value={ms} onChange={setMs} />
          </div>
          <div>
            <div className="df fdc">
              <p>Filter by price: {pf ? 'on' : 'off'}</p>
              <Switch
                color="secondary"
                style={{ color: '#e63946' }}
                checked={pf}
                onChange={() => setPf(!pf)}
              />
            </div>
            <div className="df fdc">
              <p>Filter by name: {nf ? 'on' : 'off'}</p>
              <Switch
                color="secondary"
                style={{ color: '#e63946' }}
                checked={nf}
                onChange={() => setNf(!nf)}
              />
            </div>
          </div>
        </ModalUi>
      )}
    </>
  )
})
