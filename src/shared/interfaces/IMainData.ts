import { ICard } from './ICard'

export interface IMainData {
  products_data: {
    '21vek': ICard[]
    Onliner: ICard[]
    Kufar: ICard[]
    MMG: ICard[]
  }
  response_code: number
}

export interface IMainDataCards {
  cards: {
    value: IMainData
    state: string
  }
}
