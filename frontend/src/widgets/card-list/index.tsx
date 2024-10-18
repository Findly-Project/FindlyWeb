import { CardListEntity } from '@/entities/card-list'
import { IMainDataCards } from '@/shared/interfaces/IMainData'
import { cardsApi } from '@/shared/store/cards-api'

export const CardsWidget = () => {
  const { cards } = cardsApi as IMainDataCards

  return (
    <div>
      {Object.entries(cards.value.data).map(([key, cardList]) => (
        <div key={key}>
          <h1>{key}</h1>
          <CardListEntity cards={cardList} />
        </div>
      ))}
    </div>
  )
}
