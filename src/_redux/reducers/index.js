import { combineReducers } from 'redux'
import userReducer from './userReducer'
import deepSearchReducer from './deepSearchReducer'
import playerReducer from './playerReducer'
import requestReducer from './requestReducer'
import musicReducer from './musicReducer'

const reducers = combineReducers({
  user: userReducer,
  music: musicReducer,
  deepSearch: deepSearchReducer,
  player: playerReducer,
  request: requestReducer
})

export default reducers
