import { observer } from 'mobx-react-lite'
//MOBX
import { cardsApi } from '@/shared/store/cards-api'
//COMPONENTS
import { CardsWidget } from '@/widgets/card-list'
import { SearchInputUI } from '@/shared/ui/input'

export const HomePage = observer(() => {
  const { cards } = cardsApi

  console.log('page rerender')

  return (
    <div>
      <SearchInputUI />
      <div>
        <CardsWidget />
        {cards?.state == 'pending' && 'loading'}
        {cards?.state == 'rejected' && 'error'}
        {cards?.state == 'fulfilled' && (
          <div>
            state is fulfilled
            <CardsWidget />
          </div>
        )}
      </div>
    </div>
  )
})
