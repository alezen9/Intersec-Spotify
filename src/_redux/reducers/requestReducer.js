import { REQUEST_FAILURE, REQUEST_FETCHING, REQUEST_SUCCESS, REQUEST_RESET, REQUEST_RESET_BY_KEY, RESET_ALL } from '../reduxKeys'

const initialState = {}

const requestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_RESET:
      return {}
    case REQUEST_RESET_BY_KEY:
      delete state[payload]
      return state
    case REQUEST_FAILURE:
    case REQUEST_FETCHING:
    case REQUEST_SUCCESS:
      const { key, error = null } = payload
      const value = {}
      value[key] = {
        status: `${type}`,
        error: error
      }
      return {
        ...state,
        ...value
      }
    case RESET_ALL:
      return initialState
    default:
      return state
  }
}

export default requestReducer
