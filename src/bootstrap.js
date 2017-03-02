import 'babel-polyfill';
import firebase from 'firebase';
import AuthProvider from 'libs/auth';

/**
 * Firebase connection options
 * https://firebase.google.com/docs/web/setup
 * @type {Object}
 */
const firebaseOptions = {
    apiKey: process.env.GOOGLE_KEY || '',
    messagingSenderId: process.env.GOOGLE_SENDER || '',
    authDomain: 'reduxreact-e0bff.firebaseapp.com',
    databaseURL: 'https://reduxreact-e0bff.firebaseio.com',
    storageBucket: 'reduxreact-e0bff.appspot.com',
};

/** Init firebase connection */
firebase.initializeApp(firebaseOptions);

/** Define Auth provider */
const Auth = new AuthProvider();

/** Boot up */
Auth.getUser().then(user => {
    System.import('entries/todo')
        .then(App => App.default(user));
}, error => {
    System.import('entries/auth')
        .then(App => App.default(error));
});
