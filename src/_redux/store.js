import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const saveToLocalStorage = state => {
//   try {
//     const serializedState = JSON.stringify(state)
//     window.localStorage.setItem('intersecState', serializedState)
//   } catch (e) {
//     console.log(e)
//   }
// }

// const loadFromLocalStorage = () => {
//   try {
//     const serializedState = window.localStorage.getItem('intersecState')
//     if (serializedState === null) return undefined
//     return JSON.parse(serializedState)
//   } catch (e) {
//     console.log(e)
//     return undefined
//   }
// }

// const persistedState = loadFromLocalStorage()

// const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(thunk)))

// store.subscribe(() => saveToLocalStorage(store.getState()))

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
