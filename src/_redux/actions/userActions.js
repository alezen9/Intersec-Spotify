import { SET_USER, RESET_ALL } from '../reduxKeys'
import { requestIsFetching, requestFailure, requestSuccess } from './requestActions'
import { apiInstance, getTokenFromHash } from './utils'

export const setUserToken = data => {
  const token = getTokenFromHash(data.hash)
  if (token) {
    apiInstance.setToken(token)
    window.localStorage.setItem('intersecToken', token)
  }
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {
        logged: true
      }
    })
  }
}

export const checkTokenFromStorage = data => {
  const token = getTokenFromHash(data.hash)
  if (token) {
    apiInstance.setToken(token)
    window.localStorage.setItem('intersecToken', token)
  }
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {
        logged: true
      }
    })
  }
}

export const logout = data => {
  const { key = 'GENERIC' } = data
  return async (dispatch) => {
    try {
      requestIsFetching(dispatch)(key)
      const dispatchReset = () => {
        dispatch({ type: RESET_ALL })
      }
      apiInstance.logout(dispatchReset)
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}
