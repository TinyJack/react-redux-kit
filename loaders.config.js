module.exports = [{
	test: /\.json?$/,
	exclude: /(node_modules)/,
	loader: 'json'
}, {
	test: /\.jsx?$/,
	exclude: /(node_modules)/,
	loader: 'babel-loader',
	query: {
		presets: ['es2015', 'stage-0', 'react'],
		plugins: ['add-module-exports', 'transform-decorators-legacy', 'transform-runtime']
	}
}]
