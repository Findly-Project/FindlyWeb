import { useState } from 'react'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { RangeInputUi } from '@/shared/ui/input/range'
import { ModalUi } from '@/shared/ui/modal'
import { Switch } from '@mui/material'
import { TextAreaUi } from '../textarea'
//HOOKS
import { useTranslation } from 'react-i18next'
//MOBX
import { params } from '@/shared/store/details/parameters'

interface SettingsModalProps {
  setIsActive: (_: boolean) => void
}

export const SettingsModal = observer(({ setIsActive }: SettingsModalProps) => {
  const { t } = useTranslation()
  const {
    $ms: { ms, setMs },
    $pf: { pf, setPf },
    $nf: { nf, setNf },
    $on: { on, setOn },
    $ew: { ew, setEw },
  } = params
  const [input, setInput] = useState('')
  return (
    <ModalUi off={setIsActive}>
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
      <div className="fz14">
        <span>{t('main.filter.all')}</span>
        <Switch
          color="secondary"
          style={{ color: '#e63946' }}
          checked={on}
          onChange={() => setOn(!on)}
        />
        <span>{t('main.filter.new')}</span>
      </div>
      <div>
        <TextAreaUi selected={ew} setSelected={setEw} val={input} onChange={setInput} />
      </div>
    </ModalUi>
  )
})
