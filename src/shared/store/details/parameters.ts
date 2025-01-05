import { makeAutoObservable } from 'mobx'
import { mobxState } from 'mobx-toolbox'

class SearchApiParametres {
  constructor() {
    makeAutoObservable(this)
  }

  // ==================== CARDS API PARAMS ====================

  // FULL API DOCUMENTATION: https://github.com/koloideal/FindlyAPI

  /**
    @param on - только новые
   */
  $on = mobxState(true)('on')
  /**
    @param ms - максимальное кол-во продуктов с каждого магазина
   */
  $ms = mobxState(12)('ms')
  /**
    @param pf - фильтр по цене
   */
  $pf = mobxState(true)('pf')
  /**
    @param pf - фильтр по имени
   */
  $nf = mobxState(true)('nf')
  // EXCLUSION WORDS
  /**
    @param ew - слова, которые необходимо исключить из запроса
   */
  $ew = mobxState<string[]>([])('ew')
}

export const params = new SearchApiParametres()
