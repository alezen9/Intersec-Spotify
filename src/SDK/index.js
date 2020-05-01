import axios from 'axios'
import { get } from 'lodash'
const keys = require('keys')

// SDK
class IntersecServer {
  constructor () {
    this.localStorageToken = 'intersecToken'
    const token = window.localStorage.getItem(this.localStorageToken)
    this._self = axios.create({
      baseURL: keys.backend_url,
      timeout: 100000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...{ ...token && { 'Authorization': `Bearer ${token}` } }
      }
    })
  }

  setToken (token) {
    this._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
    window.localStorage.setItem(this.localStorageToken, token)
  }

  checkToken () {
    const tokenSet = get(this._self, 'defaults.headers.common.Authorization', undefined)
    const tokenFromLocalStorage = window.localStorage.getItem(this.localStorageToken)
    if (!tokenFromLocalStorage && !tokenSet) return undefined
    if (tokenSet && tokenFromLocalStorage) return true
    if (tokenFromLocalStorage) {
      this._self.defaults.headers.common['Authorization'] = `Bearer ${tokenFromLocalStorage}`
      return true
    }
    if (tokenSet && !tokenFromLocalStorage) {
      const _token = tokenSet.split(' ')[1]
      window.localStorage.setItem(this.localStorageToken, _token)
      return true
    }
  }

  async renewToken () {
    try {
      const { token: newToken } = await this._self.get('/auth/renew-token')
      if (newToken) {
        this.setToken(newToken)
        return true
      }
      return null
    } catch (error) {
      return null
    }
  }

  logout (dispatchReset) {
    window.localStorage.removeItem(this.localStorageToken)
    if (dispatchReset) dispatchReset()
  }

  login () {
    window.location.replace(`${keys.backend_url}/auth/spotify`)
  }

  async graphql ({ name, query }, otherParams) {
    return this._self.post('/graphql', { query }, otherParams || {})
      .then(({ data }) => {
        if (data.errors) throw data.errors[0]
        else return data.data[name]
      })
  }
}

export const apiInstance = new IntersecServer()
