import { FC } from 'react'
import s from './index.module.scss'
//MOBX
import { ICard } from '@/shared/interfaces/ICard'
//COMPONENTS
import Carousel from 'react-material-ui-carousel'
import { CardEntity } from '../card'

interface CardListEntityProps {
  cards: ICard[]
  name: string
}

export const CardListEntity: FC<CardListEntityProps> = ({ cards, name }) => {
  return (
    <div className={`${s.cards}`}>
      <h2>{name}</h2>
      <Carousel
        navButtonsAlwaysVisible
        autoPlay={false}
        className={`${s.cards_carousel} df jcc aic`}
      >
        {cards?.map(card => (
          <CardEntity
            name={card.name}
            price={card.price}
            link={card.link}
            image={card.image}
            key={card.link}
          />
        ))}
      </Carousel>
    </div>
  )
}
