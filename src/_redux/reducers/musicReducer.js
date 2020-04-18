import { TOP_TRACKS_ARTISTS, ITEM_DETAILS, LYRICS, RESET_ALL } from '../reduxKeys'

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
    case ITEM_DETAILS:
      return {
        ...state,
        details: payload
      }
    case LYRICS:
      return {
        ...state,
        details: {
          ...state.details,
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
