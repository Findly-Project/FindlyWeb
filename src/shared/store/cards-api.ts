import { action, makeObservable, observable } from 'mobx'
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { Api } from './common/api'
// DATA
import { API_URL } from '../data/API_URL'
// INTERFACES
import { IMainData } from '../interfaces/IMainData'

const cardsApiProps = {
  cards: observable,
  fetchMarkets: action,
}

class CardsApi extends Api<IMainData> {
  constructor() {
    super(API_URL)
    makeObservable(this, cardsApiProps)
  }

  // ==================== CARDS API ====================

  // CARDS API STATES
  cards: IPromiseBasedObservable<IMainData> | null = null

  // API PARAMS
  $on = true
  $ms = 12
  $pf = true
  $nf = true
  $ew: string[] | null = null

  // CARDS API ACTIONS
  fetchMarkets = async (params: string) => {
    const queryParams: Record<string, string | number | undefined> = {
      q: params,
      ...(this.$ms != 12 && { ms: `${this.$ms}` }),
      ...(this.$on == false && { on: 'off' }),
      ...(this.$pf == false && { pf: 'off' }),
      ...(this.$nf == false && { nf: 'off' }),
      ...(this.$ew?.length && { ew: this.$ew.join('|') }),
    }

    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join('&')

    this.setCards(fromPromise(this.get(`?${queryString}`)))
  }

  // CARDS API STATE MOVES
  setCards = (cards: IPromiseBasedObservable<IMainData> | null) => (this.cards = cards)
}

export const cardsApi = new CardsApi()
