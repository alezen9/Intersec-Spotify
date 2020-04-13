import { TOP_TRACKS_ARTISTS, RESET_ALL } from '../reduxKeys'

const initState = {
  top: {
    tracks: [],
    artists: []
  }
}

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TOP_TRACKS_ARTISTS:
      return {
        ...state,
        top: {
          ...state.top,
          ...payload
        }
      }
    case RESET_ALL:
      return initState
    default:
      return state
  }
}

export default userReducer
