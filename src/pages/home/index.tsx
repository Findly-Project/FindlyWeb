import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//COMPONENTS
import { CardsWidget } from '@/widgets/cards'
import { Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const HomePage = observer(() => {
  const { t } = useTranslation()
  const [isNew, setIsNew] = useState(true)

  return (
    <div className={`${s.home_page} df fdc jcc aic`}>
      <div className="fz14">
        <span>{t('main.filter.all')}</span>
        <Switch color="secondary" checked={isNew} onChange={() => setIsNew(!isNew)} />
        <span>{t('main.filter.new')}</span>
      </div>
      <CardsWidget />
    </div>
  )
})
