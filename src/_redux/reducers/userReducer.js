import { SET_USER, RESET_ALL, SET_USER_DATA } from '../reduxKeys'

const initState = {
  logged: false,
  type: undefined,
  spotifyId: undefined,
  displayName: '',
  country: undefined
}

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_USER:
    case SET_USER_DATA:
      return {
        ...state,
        ...payload
      }
    case RESET_ALL:
      return initState
    default:
      return state
  }
}

export default userReducer
