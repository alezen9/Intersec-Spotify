import { SET_PLAYER, SET_PLAYER_STATE, SET_DEVICE_ID, PLAY_TRACK, CLOSE_PLAYER, PLAYABLE_SONGS } from '../reduxKeys'

const initState = {
  player: undefined,
  state: undefined,
  deviceId: undefined,
  showPlayer: false,
  trackDetails: {},
  playableTracks: []
}

const spotifyPlayerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_PLAYER:
    case SET_PLAYER_STATE:
    case SET_DEVICE_ID:
    case PLAYABLE_SONGS:
      return {
        ...state,
        ...payload
      }
    case PLAY_TRACK:
      return {
        ...state,
        showPlayer: true,
        trackDetails: payload
      }
    case CLOSE_PLAYER:
      return {
        ...state,
        showPlayer: false,
        trackDetails: {}
      }
    default:
      return state
  }
}

export default spotifyPlayerReducer
