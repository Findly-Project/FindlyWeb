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

  // ALL CARDS API STATES
  cards: IPromiseBasedObservable<IMainData> | null = null

  // ALL CARDS API ACTIONS
  fetchMarkets = async (params: string) =>
    (this.cards = fromPromise(this.get(params)))
}

export const cardsApi = new CardsApi()
