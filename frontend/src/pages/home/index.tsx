import { useRef } from 'react'
import { cardsApi } from '@/shared/store/cards-api'
import { observer } from 'mobx-react-lite'

export const HomePage = observer(() => {
  const { cards, fetchMarkets } = cardsApi

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchMarkets(inputRef.current?.value as string)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <div>
        {cards?.state == 'pending' && 'loading'}
        {cards?.state == 'rejected' && 'error'}
        {cards?.state == 'fulfilled' && (
          <div>
            {cards.value['21vek']?.map(card => {
              return <p>{card.name}</p>
            })}
            {cards.value.Kufar?.map(card => {
              return <p>{card.name}</p>
            })}
            {cards.value.MMG?.map(card => {
              return <p>{card.name}</p>
            })}
            {cards.value.Onliner?.map(card => {
              return <p>{card.name}</p>
            })}
          </div>
        )}
      </div>
    </form>
  )
})
