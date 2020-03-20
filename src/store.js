import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
/*
    commented lines make the state persistent by saving it in the localstorage,
    the lines are commented because using this method there is an issue with
    the spotify player.
*/

/*
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()
*/
//const store = createStore(rootReducer, persistedState);
const store = createStore(rootReducer);

//store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;