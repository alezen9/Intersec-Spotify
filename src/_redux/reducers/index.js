import { combineReducers } from 'redux'
import userReducer from './userReducer'
import deepSearchReducer from './deepSearchReducer'
import spotifyPlayerReducer from './spotifyPlayerReducer'
import requestReducer from './requestReducer'
import musicReducer from './musicReducer'

const reducers = combineReducers({
  user: userReducer,
  music: musicReducer,
  deepSearch: deepSearchReducer,
  player: spotifyPlayerReducer,
  request: requestReducer
})

export default reducers
