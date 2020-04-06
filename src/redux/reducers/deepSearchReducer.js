import { SET_SLIDERS, RESET_SLIDERS, SET_CHECKED_GENRES, RESET_CHECKED_GENRES } from '../reduxKeys'

const initState = {
  checkedGenres: [],
  acousticness: 0.5,
  danceability: 0.5,
  energy: 0.5,
  instrumentalness: 0.5,
  liveness: 0.5,
  speechiness: 0.5,
  valence: 0.5
}

const deepSearchReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_SLIDERS:
    case SET_CHECKED_GENRES:
    case RESET_CHECKED_GENRES:
      return {
        ...state,
        ...payload
      }
    case RESET_SLIDERS:
      return initState
    default:
      return state
  }
}

export default deepSearchReducer
