import { applyMiddleware, createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

const middlewares = [thunk]

/** use: logger middleware for develop (see NODE_ENV in webpack.config.js as DefinePlugin()) */
if (process.env.NODE_ENV !== 'production')
    middlewares.push(require('redux-logger')())

export default createStore(combineReducers({
    ...reducers,
    routing: routerReducer
}), applyMiddleware.apply(this, middlewares))
