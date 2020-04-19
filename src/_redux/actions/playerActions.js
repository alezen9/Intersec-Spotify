import { TRACK_STATUS } from '_redux/reduxKeys'

export const playerTrackStatus = data => {
  return async (dispatch) => {
    dispatch({
      type: TRACK_STATUS,
      payload: data
    })
  }
}
