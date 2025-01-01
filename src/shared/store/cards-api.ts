import { action, makeObservable, observable } from 'mobx'
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { Api } from './common/api'
// DATA
import { API_URL } from '../data/API_URL'
// INTERFACES
import { IMainData } from '../interfaces/IMainData'
import { params } from './details/parameters'

const cardsApiProps = {
  cards: observable,
  fetchMarkets: action,
}

const { $ms, $on, $pf, $nf, $ew } = params

class CardsApi extends Api<IMainData> {
  constructor() {
    super(API_URL)
    makeObservable(this, cardsApiProps)
  }

  // ==================== CARDS API ====================

  // CARDS API STATES
  cards: IPromiseBasedObservable<IMainData> | null = null

  // CARDS API ACTIONS
  fetchMarkets = async (params: string) => {
    const ex_words = $ew.ew.join('|')
    const queryParams: Record<string, string | number | null> = {
      q: params,
      ms: $ms.ms,
      on: $on.on === false ? 'off' : null,
      pf: $pf.pf === false ? 'off' : null,
      nf: $nf.nf === false ? 'off' : null,
      ew: $ew.ew.length > 0 ? ex_words : null,
    }

    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(`${value}`)}`)
      .join('&')

    console.log(queryParams, queryString)

    this.setCards(fromPromise(this.get(`?${queryString}`)))
  }

  // CARDS API STATE MOVES
  setCards = (cards: IPromiseBasedObservable<IMainData> | null) => (this.cards = cards)
}

export const cardsApi = new CardsApi()
