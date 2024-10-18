import { ICard } from './ICard'

export interface IMainData {
  data: {
    '21vek': ICard[]
    Onliner: ICard[]
    Kufar: ICard[]
    MMG: ICard[]
  }
}

export interface IMainDataCards {
  cards: {
    value: IMainData
    state: string
  }
}
