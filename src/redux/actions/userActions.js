import { SET_USER } from '../reduxKeys'
import { requestIsFetching, requestFailure, requestSuccess } from './requestActions'
import { apiInstance } from './utils'

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

export const getTracks = data => {
  const { key = 'GENERIC', ...body } = data
  return async (dispatch) => {
    try {
      requestIsFetching(dispatch)(key)
      const res = await apiInstance.getTopTracks(body)
      console.log(res)
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}
