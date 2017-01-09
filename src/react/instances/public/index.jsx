import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider, connect } from 'react-redux'

import store from './store'
import * as Routes from './routes'

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ syncHistoryWithStore(browserHistory, store) }>
            <Route path='/' component={ Routes.Main.default } />
        </Router>
    </Provider>,
document.getElementById('app'))
