// import { requestIsFetching, requestSuccess, requestFailure } from './requestActions'
import { SET_ACTIVE_SECTION } from '_redux/reduxKeys'

export const setActiveSection = data => {
  const { target, title } = data
  return async (dispatch) => {
    dispatch({
      type: SET_ACTIVE_SECTION,
      payload: {
        activeSection: {
          target,
          title
        }
      }
    })
  }
}
