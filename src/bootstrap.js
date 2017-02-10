import 'babel-polyfill'
import firebase from 'firebase'
import AuthProvider from 'libs/auth'

/**
 * Firebase connection options
 * https://firebase.google.com/docs/web/setup
 * @type {Object}
 */
const firebaseOptions = {
    apiKey: process.env.GOOGLE_KEY || '',
    messagingSenderId: process.env.GOOGLE_SENDER || '',
    authDomain: "react-redux-kit.firebaseapp.com",
    databaseURL: "https://react-redux-kit.firebaseio.com",
    storageBucket: "react-redux-kit.appspot.com"
}

/** Init firebase connection */
firebase.initializeApp(firebaseOptions);

/** Define Auth provider */
const Auth = new AuthProvider();

/** Boot up */
Auth.getUser().then(user => {
    System.import('entries/todo')
        .then(App => App.onSuccess(user))
        .catch(Err => { throw new Error(Err) });
}, error => {
    System.import('entries/auth')
        .then(App => App.onSuccess(error));
});
