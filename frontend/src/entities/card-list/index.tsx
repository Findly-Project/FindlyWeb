import { ICard } from '@/shared/interfaces/ICard'
import { FC } from 'react'
import { CardEntity } from '../card'

interface CardListEntityProps {
  cards: ICard[]
}

export const CardListEntity: FC<CardListEntityProps> = ({ cards }) => {
  return (
    <div>
      {cards?.map(card => (
        <CardEntity name={card.name} price={card.price} link={card.link} image={card.image} />
      ))}
    </div>
  )
}
