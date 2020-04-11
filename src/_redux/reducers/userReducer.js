import { SET_USER, RESET_ALL } from '../reduxKeys'

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
    case RESET_ALL:
      return initState
    default:
      return state
  }
}

export default userReducer
