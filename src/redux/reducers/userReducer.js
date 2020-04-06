import { SET_USER, LOGOUT } from '../reduxKeys'

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
      return {
        ...state,
        ...payload
      }
    case LOGOUT:
      return initState
    default:
      return state
  }
}

export default userReducer
