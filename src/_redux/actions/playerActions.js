import { TRACK_STATUS, PLAYBACK_STATUS, SET_SIMPLE_PLAYER } from '_redux/reduxKeys'

export const playerTrackStatus = track => {
  return async (dispatch) => {
    dispatch({
      type: TRACK_STATUS,
      payload: {
        current: track
      }
    })
  }
}

export const setPlaybackStatus = data => {
  return async (dispatch) => {
    dispatch({
      type: PLAYBACK_STATUS,
      payload: data
    })
  }
}

export const setSimplePlayer = idRef => {
  return async (dispatch) => {
    dispatch({
      type: SET_SIMPLE_PLAYER,
      payload: {
        simplePlayerId: idRef
      }
    })
  }
}
