import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import * as Routes from './routes';

/** Main Application node */
const node = (
    <Router history={browserHistory}>
        <Route path="/" component={Routes.Main} />
        <Redirect from="*" to="/" />
    </Router>
);

/** Render Application node */
ReactDOM.render(node, document.getElementById('app'));

/** Success loading */
export default function onSuccess() {
    // TODO: parse error
}
