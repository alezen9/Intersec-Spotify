import { TOP_TRACKS_ARTISTS, ITEM_DETAILS } from '../reduxKeys'
import { requestIsFetching, requestFailure, requestSuccess } from './requestActions'
import { apiInstance } from 'SDK'
import { _getTopTracksArtists, _getTrackById } from 'SDK/query'

export const getTopTracksArtists = data => {
  const { key = 'GENERIC_KEY', type = 'tracks', offset, limit, timeRange } = data
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const { country: market } = state.user
      requestIsFetching(dispatch)(key)
      const query = _getTopTracksArtists({ type, market, offset, limit, timeRange })
      const res = await apiInstance.graphql(query)
      dispatch({
        type: TOP_TRACKS_ARTISTS,
        payload: {
          [type]: res
        }
      })
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}

export const getTrackById = data => {
  const { key = 'GENERIC_KEY', id } = data
  return async (dispatch, getState) => {
    try {
      requestIsFetching(dispatch)(key)
      const query = _getTrackById({ id })
      const res = await apiInstance.graphql(query)
      dispatch({
        type: ITEM_DETAILS,
        payload: res
      })
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}
