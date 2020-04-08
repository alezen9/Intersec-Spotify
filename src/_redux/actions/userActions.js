import { SET_USER } from '../reduxKeys'
import { requestIsFetching, requestFailure, requestSuccess } from './requestActions'
import { apiInstance } from './utils'
import { TopSearch } from '../Entities'

export const setUser = user => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {
        logged: true,
        ...user
      }
    })
  }
}

export const getTopTracksArtists = data => {
  const { key = 'GENERIC', ...body } = data
  return async (dispatch) => {
    try {
      requestIsFetching(dispatch)(key)
      const promises = [TopSearch.Tracks, TopSearch.Artists]
        .map(toSearch => apiInstance.getTopTracksArtists({ toSearch, ...body }))
      const [{ data: tracks }, { data: artists }] = await Promise.all(promises)
      console.log(tracks, artists)
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}

export const logout = data => {
  const { key = 'GENERIC' } = data
  return async (dispatch) => {
    try {
      requestIsFetching(dispatch)(key)
      await apiInstance.logout()
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}
