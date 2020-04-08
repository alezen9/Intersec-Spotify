import axios from 'axios'
const keys = require('keys')

// SDK
class IntersecServer {
  constructor () {
    this._self = axios.create({
      baseURL: keys.backend_url,
      timeout: 100000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   *
   * @param {any} body
   * @param {string} body.toSearch
   * @param {string} body.spotifyId
   */
  async getTopTracks (body) {
    const { toSearch, spotifyId } = body
    return this._self.get(`/api/top/${toSearch}/${spotifyId}`)
  }
}

export const apiInstance = new IntersecServer()
