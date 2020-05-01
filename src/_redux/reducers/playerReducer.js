import { TRACK_STATUS, RESET_ALL, PLAYBACK_STATUS, SET_SIMPLE_PLAYER } from '../reduxKeys'

const initState = {
  isPlaying: false
}

const playerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TRACK_STATUS:
    case PLAYBACK_STATUS:
    case SET_SIMPLE_PLAYER:
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

export default playerReducer
