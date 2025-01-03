import { makeAutoObservable } from 'mobx'
import { mobxState } from 'mobx-toolbox'

class SearchApiParametres {
  constructor() {
    makeAutoObservable(this)
  }

  // ==================== CARDS API PARAMS ====================

  // FULL API DOCUMENTATION: https://github.com/koloideal/FindlyAPI

  // ONLY NEW
  $on = mobxState(true)('on')
  // MAX SIZE
  $ms = mobxState(12)('ms')
  // FILTER BY PRICE
  $pf = mobxState(true)('pf')
  // FILTER BY NAME
  $nf = mobxState(true)('nf')
  // EXCLUSION WORDS
  $ew = mobxState<string[]>([])('ew')
}

export const params = new SearchApiParametres()
