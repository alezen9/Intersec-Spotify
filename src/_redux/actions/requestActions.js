import {
  REQUEST_FETCHING,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
  REQUEST_RESET,
  REQUEST_RESET_BY_KEY
} from '_redux/reduxKeys'

export const requestIsFetching = dispatch => (key, cancelToken) => dispatch({
  type: REQUEST_FETCHING,
  payload: {
    key,
    ...cancelToken && { cancelToken }
  }
})

export const requestSuccess = dispatch => key => {
  dispatch({ type: REQUEST_SUCCESS, payload: { key } })
}

export const requestFailure = dispatch => (key, error) => {
  if (error && error.message) {
    console.error(`requestFailure: ${key}`)
    console.error(error)
    return dispatch({
      type: REQUEST_FAILURE,
      payload: {
        key,
        error: error.message.replace('GraphQL error: ', '')
      }
    })
  }
}

export const requestReset = () => {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_RESET
    })
  }
}

export const requestResetByKey = key => {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_RESET_BY_KEY,
      payload: key
    })
  }
}
