import { SET_USER, RESET_ALL, SET_USER_DATA } from '../reduxKeys'
import { requestIsFetching, requestFailure, requestSuccess } from './requestActions'
import { getTokenFromHash } from 'utils/utils'
import { apiInstance } from 'SDK'
import { _getUserData } from 'SDK/query'

export const setUserToken = data => {
  const token = getTokenFromHash(data.hash)
  if (token) apiInstance.setToken(token)
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {
        logged: true
      }
    })
    dispatch(getUserData({}))
    if (data.key) requestSuccess(dispatch)(data.key)
  }
}

export const checkToken = () => {
  return async (dispatch) => {
    const isTokenOk = apiInstance.checkToken()
    if (isTokenOk) dispatch(getUserData({}))
    dispatch({
      type: SET_USER,
      payload: {
        logged: !!isTokenOk
      }
    })
  }
}

export const logout = data => {
  const { key = 'GENERIC_KEY' } = data
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

export const getUserData = data => {
  const { key = 'GENERIC_KEY' } = data
  return async (dispatch) => {
    try {
      requestIsFetching(dispatch)(key)
      const query = _getUserData()
      const res = await apiInstance.graphql(query)
      dispatch({
        type: SET_USER_DATA,
        payload: res
      })
      requestSuccess(dispatch)(key)
    } catch (error) {
      requestFailure(dispatch)(key, error)
    }
  }
}
