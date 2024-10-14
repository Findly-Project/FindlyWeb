import { CardListEntity } from '@/entities/card-list'
import { IMainData } from '@/shared/interfaces/IMainData'
import { cardsApi } from '@/shared/store/cards-api'

interface CardsWidgetProps {
  cards: {
    value: IMainData
  }
}

export const CardsWidget = () => {
  const { cards } = cardsApi as CardsWidgetProps

  return (
    <div>
      <h1>Kufar</h1>
      <CardListEntity cards={cards?.value?.data.Kufar} />
      <h1>MMG</h1>
      <CardListEntity cards={cards?.value?.data.MMG} />
      <h1>Onliner</h1>
      <CardListEntity cards={cards?.value?.data.Onliner} />
      <h1>21vek</h1>
      <CardListEntity cards={cards?.value?.data['21vek']} />
    </div>
  )
}
