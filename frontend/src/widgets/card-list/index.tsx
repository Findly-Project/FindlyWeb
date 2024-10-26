import s from './index.module.scss'
//INTERFACES
import { IMainDataCards } from '@/shared/interfaces/IMainData'
//COMPONENTS
import { CardListEntity } from '@/entities/card-list'
import { CircularProgress } from '@mui/material'
//MOBX
import { cardsApi } from '@/shared/store/cards-api'
import { observer } from 'mobx-react-lite'

export const CardsWidget = observer(() => {
  const { cards } = cardsApi as IMainDataCards

  if (!cards) return 'Please type product name'
  if (cards?.state == 'pending') return <CircularProgress color="inherit" />
  if (cards?.state == 'rejected') return 'Error, please try again!'

  return (
    <>
      <div className={`${s.markets_grid} dg jcc aic`}>
        {Object.entries(cards?.value?.data).map(([key, cardList]) => (
          <CardListEntity cards={cardList} name={key} key={key} />
        ))}
      </div>
      {Object.entries(cards?.value?.data).length == 0 && <h3>Not found :(</h3>}
    </>
  )
})
