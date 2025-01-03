import { makeAutoObservable } from 'mobx'
import { mobxState } from 'mobx-toolbox'

class VisualSettingsStore {
  constructor() {
    makeAutoObservable(this)
  }

  // ==================== VISUAL SETTINGS ====================
  // THEME
  // theme = mobxState<string>('dark')('theme')
}

export const visual = new VisualSettingsStore()
