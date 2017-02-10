import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import { SET_NAME } from './constants'
import * as Routes from './routes'
import store from './store'

/** Bind history actions to store */
const history = syncHistoryWithStore(browserHistory, store);

/** Main Application node */
const node = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={ Routes.Main } />
            <Redirect from="*" to="/" />
        </Router>
    </Provider>
);

/** Render Application node */
ReactDOM.render(node, document.getElementById('app'));

/** Success loading */
export function onSuccess(...data) {
}
