import { makeAutoObservable } from 'mobx'
import { mobxState } from 'mobx-toolbox'

class SearchApiParametres {
  constructor() {
    makeAutoObservable(this)
  }

  // ==================== CARDS API PARAMS ====================
  $on = mobxState(true)('on')
  $ms = mobxState(12)('ms')
  $pf = mobxState(true)('pf')
  $nf = mobxState(true)('nf')
  $ew = mobxState<string[]>([])('ew')
}

export const params = new SearchApiParametres()
