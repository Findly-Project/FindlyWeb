import { FC } from 'react'
import s from './index.module.scss'
//MOBX
import { ICard } from '@/shared/interfaces/ICard'
//COMPONENTS
import Carousel from 'react-material-ui-carousel'
import { CardEntity } from '../card'
import { useMobile } from '../../shared/hooks/useMobile'

interface CardListEntityProps {
  cards: ICard[]
  name: string
}

export const CardListEntity: FC<CardListEntityProps> = ({ cards, name }) => {
  const isMobile = useMobile()

  return (
    <div className={`${s.cards}`}>
      <h2>{name}</h2>
      <Carousel
        navButtonsAlwaysVisible
        autoPlay={false}
        className={`${s.cards_carousel} df jcc aic`}
        indicatorIconButtonProps={{
          style: {
            marginTop: !isMobile ? '25px' : '0px',
          },
        }}
      >
        {cards?.map(card => (
          <CardEntity
            name={card.name}
            price={card.price}
            link={card.link}
            image={card.image}
          />
        ))}
      </Carousel>
    </div>
  )
}
