import { TOP_TRACKS_ARTISTS, ITEM_DETAILS, LYRICS } from '../reduxKeys'
import { requestIsFetching, requestFailure, requestSuccess } from './requestActions'
import { apiInstance } from 'SDK'
import { _getTopTracksArtists, _getTrackById, _getTrackLyrics } from 'SDK/query'
import axios from 'axios'
import { get } from 'lodash'

export const getTopTracksArtists = data => {
  const { key = 'GENERIC_KEY', type = 'tracks', offset = 0, limit = 20, timeRange = 'medium_term', more = false } = data
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const { country: market } = state.user
      const { offset: _off = -1, total } = get(state, `music.top.${type}.${timeRange}`, {})
      const hasMore = _off + limit <= total
      if ((!more && offset > _off) || (more && hasMore)) {
        console.log(timeRange, _off, total, hasMore)
        requestIsFetching(dispatch)(key)
        const query = _getTopTracksArtists({ type, market, offset: more ? _off + limit : offset, limit, timeRange })
        const res = await apiInstance.graphql(query)
        dispatch({
          type: TOP_TRACKS_ARTISTS,
          payload: {
            type,
            timeRange,
            res
          }
        })
        requestSuccess(dispatch)(key)
      }
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}

export const getTrackById = data => {
  const { key = 'GENERIC_KEY', id } = data
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const details = get(state, `music.details.${id}`, null)
      if (!details) {
        requestIsFetching(dispatch)(key)
        const query = _getTrackById({ id })
        const res = await apiInstance.graphql(query)
        dispatch({
          type: ITEM_DETAILS,
          payload: res
        })
        requestSuccess(dispatch)(key)
      }
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}

export const getTrackLyrics = data => {
  const { key = 'GENERIC_KEY', id } = data
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const details = get(state, `music.details.${id}`, null)
      const hasLyrics = details ? details.lyrics : false
      if (!hasLyrics) {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        const cancelToken = source.token
        requestIsFetching(dispatch)(key, source)
        const query = _getTrackLyrics({ id })
        const res = await apiInstance.graphql(query, { cancelToken })
        dispatch({
          type: LYRICS,
          payload: {
            id,
            ...res
          }
        })
        requestSuccess(dispatch)(key)
      }
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}
