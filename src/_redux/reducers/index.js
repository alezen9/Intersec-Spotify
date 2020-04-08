import { combineReducers } from 'redux'
import userReducer from './userReducer'
import deepSearchReducer from './deepSearchReducer'
import spotifyPlayerReducer from './spotifyPlayerReducer'
import requestReducer from './requestReducer'

const reducers = combineReducers({
  user: userReducer,
  deepSearch: deepSearchReducer,
  player: spotifyPlayerReducer,
  request: requestReducer
})

export default reducers
