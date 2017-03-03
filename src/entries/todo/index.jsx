import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import * as Routes from './routes';
import store from './store';
import { SET_USER } from './constants';
import Aside from './components/Aside';
import { pushItem, deleteItem } from './actions/todosActions';

/** Bind history actions to store */
const history = syncHistoryWithStore(browserHistory, store);

/** Main Application node */
const node = (
    <Provider store={store}>
        <div className="content">
            <Aside />
            <Router history={history}>
                <Route path="/" component={Routes.Main} />
                <Redirect from="*" to="/" />
            </Router>
        </div>
    </Provider>
);

/** Render Application node */
ReactDOM.render(node, document.getElementById('app'));

/** Success loading */
export default function onSuccess(...data) {
    const [payload] = data;

    /**
     * Dispatch current user
     * @type {Dispatch factory}
     */
    store.dispatch({
        payload,
        type: SET_USER,
    });
}

store.dispatch(pushItem('Bdfsdfsa'));
store.dispatch(deleteItem(1));
