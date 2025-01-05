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
//DATA
import i18n from '@/shared/data/i18n'

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
  const changeLang = i18n.language == 'ru' ? 'en' : 'ru'
  const isActive = (_: boolean) => (_ ? 'on' : 'off')
  return (
    <ModalUi off={setIsActive}>
      <div className="df fdc">
        <p>
          {t('main.settings.max_size')}: {ms}
        </p>
        <RangeInputUi max={40} value={ms} onChange={setMs} />
      </div>
      <div>
        <div className="df fdc">
          <p>
            {t('main.settings.price')}: {isActive(pf)}
          </p>
          <Switch
            color="secondary"
            style={{ color: '#e63946' }}
            checked={pf}
            onChange={() => setPf(!pf)}
          />
        </div>
        <div className="df fdc">
          <p>
            {t('main.settings.name')}: {isActive(nf)}
          </p>
          <Switch
            color="secondary"
            style={{ color: '#e63946' }}
            checked={nf}
            onChange={() => setNf(!nf)}
          />
        </div>
      </div>
      <div>
        <p>
          {t('main.settings.new')}: {isActive(on)}
        </p>
        <Switch
          color="secondary"
          style={{ color: '#e63946' }}
          checked={on}
          onChange={() => setOn(!on)}
        />
      </div>
      <div>
        <TextAreaUi selected={ew} setSelected={setEw} val={input} onChange={setInput} />
      </div>
      <div>
        <p>
          {t('main.settings.lang.text')}: {i18n.language}
        </p>
        <button onClick={() => i18n.changeLanguage(changeLang)}>
          {t('main.settings.lang.btn')} {changeLang}
        </button>
      </div>
    </ModalUi>
  )
})
