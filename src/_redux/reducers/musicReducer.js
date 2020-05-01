import { TOP_TRACKS_ARTISTS, ITEM_DETAILS, LYRICS, RESET_ALL } from '../reduxKeys'
import { get } from 'lodash'

const initState = {
  top: {
    tracks: [],
    artists: []
  }
}

const musicReducer = (state = initState, { type, payload }) => {
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
        details: {
          ...(state.details || {}),
          [payload.id]: payload
        }
      }
    case LYRICS:
      const thisTrack = get(state, `details.${payload.id}`, {})
      return {
        ...state,
        details: {
          ...state.details,
          [payload.id]: {
            ...thisTrack,
            ...payload
          }
        }
      }
    case RESET_ALL:
      return initState
    default:
      return state
  }
}

export default musicReducer
