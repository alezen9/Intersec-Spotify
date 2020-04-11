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
  }

  async checkToken (token) {
    const tokenSet = get(this._self, 'defaults.headers.common.Authorization', undefined)
    if (tokenSet) {
      const _token = tokenSet.split(' ')[1]
    }
  }

  /**
   *
   * @param {any} body
   * @param {string} body.toSearch
   * @param {string} body.spotifyId
   */
  async getTopTracksArtists (body) {
    const { toSearch, spotifyId } = body
    return this._self.get(`/api/top/${toSearch}/${spotifyId}`)
  }

  logout (dispatchReset) {
    window.localStorage.removeItem(this.localStorageToken)
    dispatchReset()
  }

  login () {
    window.location.replace(`${keys.backend_url}/auth/spotify`)
  }
}

export const apiInstance = new IntersecServer()

export const getTokenFromHash = hash => {
  if (typeof hash !== 'string') return undefined
  const isHashToken = hash.startsWith('#token')
  if (!isHashToken) return undefined
  const data = hash.split('=')
  if (data.length !== 2 || data[0] !== '#token') return undefined
  return data[1]
}
