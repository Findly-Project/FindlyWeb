import { action, makeObservable, observable } from 'mobx'
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { Api } from './common/api'
//DATA
import { API_URL } from '../data/API_URL'
//INTERFACES
import { IMainData } from '../interfaces/IMainData'

const cardsApiProps = {
  cards: observable,
  fetchMarkets: action,
}

class CardsApi extends Api<IMainData> {
  constructor() {
    super(`${API_URL}q=`)
    makeObservable(this, cardsApiProps)
  }

  // ==================== CARDS API ====================

  // CARDS API STATES
  cards: IPromiseBasedObservable<IMainData> | null = null

  // CARDS API ACTIONS
  fetchMarkets = async (params: string) => this.setCards(fromPromise(this.get(params)))

  // CARDS API STATE MOVES
  setCards = (cards: IPromiseBasedObservable<IMainData> | null) => (this.cards = cards)
}

export const cardsApi = new CardsApi()
