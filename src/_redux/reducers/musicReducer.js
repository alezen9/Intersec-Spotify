import { TOP_TRACKS_ARTISTS, ITEM_DETAILS, LYRICS, RESET_ALL } from '../reduxKeys'
import { get, uniqBy } from 'lodash'

const initState = {
  top: {
    tracks: {},
    artists: {}
  }
}

const musicReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TOP_TRACKS_ARTISTS:
      return {
        ...state,
        top: {
          ...state.top,
          [payload.type]: {
            ...state.top[payload.type],
            [payload.timeRange]: {
              ...get(state, `top.${payload.type}.${payload.timeRange}`, {}),
              ...payload.res,
              items: uniqBy([
                ...get(state, `top.${payload.type}.${payload.timeRange}.items`, []),
                ...payload.res.items || []
              ], 'id')
            }
          }
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
