import { action, makeObservable, observable } from 'mobx'
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { Api } from './common/api'
// DATA
import { API_URL } from '../data/API_URL'
// INTERFACES
import { IMainData } from '../interfaces/IMainData'
//MOBX
import { params } from './details/parameters'
import { mobxState } from 'mobx-toolbox'

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

  // FULL API DOCUMENTATION: https://github.com/koloideal/FindlyAPI

  // CARDS API STATES
  cards = mobxState<IPromiseBasedObservable<IMainData> | null>(null)('cards')

  // CARDS API ACTIONS
  /**
   * Функция отправляет запрос на сервер с целью получения информации о запрашиваемом товаре с разных магазинов
   *
   *  @param query - Запрос пользователя в виде строки, который принимает функция
   *
   * В ней задействованы параметры фильтрации, которые не принимаются функцией, но берутся из других стейтов: @param ms - максимальное кол-во продуктов с каждого магазина
      @param on - только новые
   *  @param pf - фильтр по цене
   *  @param nf - фильтр по имени
   *  @param ew - слова, которые необходимо исключить из запроса
   */
  fetchMarkets = async (query: string) => {
    // JOIN EXCLUSION WORDS
    const ex_words = $ew.ew.join('|')
    // SET API PARAMS TO OBJECT
    const queryParams: Record<string, string | number | null> = {
      q: query,
      ms: $ms.ms,
      on: $on.on === false ? 'off' : null,
      pf: $pf.pf === false ? 'off' : null,
      nf: $nf.nf === false ? 'off' : null,
      ew: $ew.ew.length > 0 ? ex_words : null,
    }
    // STRINGIFY OBJECT WITH API PARAMS
    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(`${value}`)}`)
      .join('&')

    this.cards.setCards(fromPromise(this.get(`?${queryString}`)))
  }
}

export const cardsApi = new CardsApi()
