import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//COMPONENTS
import { CardsWidget } from '@/widgets/card-list'
import { Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const HomePage = observer(() => {
  const { t } = useTranslation()

  return (
    <div className={`${s.home_page} df fdc jcc aic`}>
      <div className="fz14">
        <span>{t('main.filter.all')}</span>
        <Switch color="secondary" />
        <span>{t('main.filter.new')}</span>
      </div>
      <CardsWidget />
    </div>
  )
})
