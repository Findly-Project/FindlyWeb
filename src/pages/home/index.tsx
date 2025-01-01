import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import s from './index.module.scss'
//COMPONENTS
import { CardsWidget } from '@/widgets/cards'
import { Switch } from '@mui/material'
//MOBX
import { params } from '@/shared/store/details/parameters'

export const HomePage = observer(() => {
  const { t } = useTranslation()
  const {
    $on: { on, setOn },
  } = params

  return (
    <div className={`${s.home_page} df fdc jcc aic`}>
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
      <CardsWidget />
    </div>
  )
})
