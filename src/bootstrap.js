import 'babel-polyfill'

System.import('entries/demo')
    .then(App => App.onSuccess('react-redux-kit'))
    .catch(Err => { throw new Error(Err) });
