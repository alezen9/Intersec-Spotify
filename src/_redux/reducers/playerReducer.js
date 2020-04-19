import { TRACK_STATUS, RESET_ALL } from '../reduxKeys'

const initState = {
  duration: 0,
  isPlaying: false
}

const playerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TRACK_STATUS:
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
