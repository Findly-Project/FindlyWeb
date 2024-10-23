import s from './index.module.scss'
import { CardListEntity } from '@/entities/card-list'
import { IMainDataCards } from '@/shared/interfaces/IMainData'
import { cardsApi } from '@/shared/store/cards-api'
import { data } from '@/shared/data/temp_data'

export const CardsWidget = () => {
  const { cards } = cardsApi as IMainDataCards

  return (
    <div className={`${s.markets_grid} dg jcc aic`}>
      {Object.entries(data.data).map(([key, cardList]) => (
        <CardListEntity cards={cardList} name={key} key={key} />
      ))}
    </div>
  )
}
