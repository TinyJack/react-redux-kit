import { applyMiddleware, createStore, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { routerReducer } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

/** Appliction middlewares */
const middlewares = [thunk, promiseMiddleware()];

/** Debug middlewares */
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger());
}

/**
 * Reducers combiner
 * @type {Function}
 */
export default createStore(combineReducers({
    ...reducers,
    routing: routerReducer,
}), applyMiddleware(...middlewares));
