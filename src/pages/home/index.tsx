import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//COMPONENTS
import { CardsWidget } from '@/widgets/card-list'
import { Switch } from '@mui/material'

export const HomePage = observer(() => {
  return (
    <div className={`${s.home_page} df fdc jcc aic`}>
      <div className="fz14">
        <span>All</span>
        <Switch color="secondary" />
        <span>Only new</span>
      </div>
      <CardsWidget />
    </div>
  )
})
