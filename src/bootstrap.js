import 'babel-polyfill'

/** boot */
require.ensure([], require => require('./react/instances/public'))
