import s from './index.module.scss'
//MOBX
import { ICard } from '@/shared/interfaces/ICard'
//COMPONENTS
import Carousel from 'react-material-ui-carousel'
import { CardEntity } from './components/card/index'

interface CardListEntityProps {
  cards: ICard[]
  name: string
}

export const CardListEntity = ({ cards, name }: CardListEntityProps) => {
  return (
    <div className={`${s.cards}`}>
      <h2>{name}</h2>
      <Carousel
        navButtonsAlwaysVisible
        autoPlay={false}
        className={`${s.cards_carousel} df jcc aic`}
      >
        {cards?.map(card => (
          <CardEntity card={card} key={card.link} />
        ))}
      </Carousel>
    </div>
  )
}
