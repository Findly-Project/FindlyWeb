import axios from 'axios'
import { action, makeObservable } from 'mobx'

const ApiProps = {
  get: action,
}

export class Api<T> {
  constructor(path: string) {
    makeObservable(this, ApiProps)
    this.path = path
  }

  // ==================== API REQUESTS ====================

  // ALL API STATES
  path: string

  // ALL API ACTIONS
  get = async (params: string) => (await axios.get<T>(`${this.path}${params}`)).data
}
