import s from './index.module.scss'
import { ICard } from '@/shared/interfaces/ICard'

interface CardEntityProps {
  card: ICard
}

export const CardEntity = ({ card }: CardEntityProps) => {
  const { image, link, name, price } = card

  return (
    <a href={link} target="_blank" className={`${s.card_item} df`}>
      <img src={image} alt={image} className={s.card_item__image} />
      <div className={s.card_item__info}>
        <p className={`${s.card_item__name} cw`}>{name}</p>
        <p className={`${s.card_item__price}`}>{price} BYN</p>
      </div>
    </a>
  )
}
