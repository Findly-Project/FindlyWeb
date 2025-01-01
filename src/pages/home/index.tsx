import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//COMPONENTS
import { CardsWidget } from '@/widgets/cards'

export const HomePage = observer(() => {
  return (
    <div className={`${s.home_page} df fdc jcc aic`}>
      <CardsWidget />
    </div>
  )
})
