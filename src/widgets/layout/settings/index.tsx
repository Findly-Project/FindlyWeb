import { useState } from 'react'
import s from './index.module.scss'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'
//ICONS
import SettingsIcon from '@mui/icons-material/Settings'
//COMPONENTS
import { ModalUi } from '@/shared/ui/modal'
import { RangeInputUi } from '@/shared/ui/input/range'
import { Switch } from '@mui/material'
import { TextAreaUi } from '@/shared/ui/input/textarea'
//MOBX
import { params } from '@/shared/store/details/parameters'

export const SettingsLayoutWidget = observer(() => {
  const { t } = useTranslation()
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const {
    $ms: { ms, setMs },
    $pf: { pf, setPf },
    $nf: { nf, setNf },
    $on: { on, setOn },
    $ew: { ew, setEw },
  } = params
  const [input, setInput] = useState('')
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
      )}
    </>
  )
})
