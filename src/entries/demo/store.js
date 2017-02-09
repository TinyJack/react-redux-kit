import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import { debug } from 'libs/utils'
import * as reducers from './reducers'

/** Appliction middlewares */
const middlewares = [thunk, promiseMiddleware()];

/** Debug middlewares */
if (debug) {
    middlewares.push(require('redux-logger')());
}

export default createStore(combineReducers({
    ...reducers,
    routing: routerReducer
}), applyMiddleware.apply(this, middlewares));
