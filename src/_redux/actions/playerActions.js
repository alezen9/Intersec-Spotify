import { TRACK_STATUS } from '_redux/reduxKeys'

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
