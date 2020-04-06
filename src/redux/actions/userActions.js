import { SET_USER } from '../reduxKeys'

export const setUser = user => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {
        logged: true,
        ...user
      }
    })
  }
}
