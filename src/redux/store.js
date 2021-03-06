import { combineReducers, compose, createStore } from 'redux'

import { userLoginReducer } from './reducers/authReducer'

const initialState = {}
const reducer = combineReducers({
    userLogin: userLoginReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    initialState,
    composeEnhancer()
)

export default store