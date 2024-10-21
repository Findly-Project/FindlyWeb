import { FC } from 'react'
import s from './index.module.scss'
//MOBX
import { ICard } from '@/shared/interfaces/ICard'
//COMPONENTS
import Carousel from 'react-material-ui-carousel'
import { CardEntity } from '../card'

interface CardListEntityProps {
  cards: ICard[]
}

export const CardListEntity: FC<CardListEntityProps> = ({ cards }) => {
  return (
    <Carousel
      navButtonsAlwaysVisible
      autoPlay={false}
      indicators={false}
      className={`${s.cards_carousel} df aic jcc`}
    >
      {cards?.map(card => (
        <CardEntity name={card.name} price={card.price} link={card.link} image={card.image} />
      ))}
    </Carousel>
  )
}
