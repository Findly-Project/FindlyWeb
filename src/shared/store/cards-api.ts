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
    const queryParams: Record<string, string | number | undefined> = {
      q: params,
      ...{ ms: `${$ms.ms}` },
      ...($on.on == false && { on: 'off' }),
      ...($pf.pf == false && { pf: 'off' }),
      ...($nf.nf == false && { nf: 'off' }),
      ...($ew.ew?.length && { ew: $ew.ew.join('|') }),
    }

    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join('&')

    console.log(queryParams, queryString)

    this.setCards(fromPromise(this.get(`?${queryString}`)))
  }

  // CARDS API STATE MOVES
  setCards = (cards: IPromiseBasedObservable<IMainData> | null) => (this.cards = cards)
}

export const cardsApi = new CardsApi()
