import { ICard } from '@/shared/interfaces/ICard'
import { FC } from 'react'
import s from './index.module.scss'

export const CardEntity: FC<ICard> = ({ name, price, link, image }) => {
  return (
    <div className={`${s.card_item} df`}>
      <img src={image} alt={image} />
      <p className={`${s.card_item__name} cw`}>{name}</p>
      <p className={`${s.card_item__price} cred`}>{price} BYN</p>
    </div>
  )
}
