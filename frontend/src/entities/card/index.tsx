import { ICard } from '@/shared/interfaces/ICard'
import { FC } from 'react'

export const CardEntity: FC<ICard> = ({ name, price, link, image }) => {
  return (
    <div className="dg">
      {name}
      {price}
      {link}
      {image}
    </div>
  )
}
