const AssetsPlugin = require('assets-webpack-plugin');
const webpackStream = require('webpack-stream');
const loaders = require('./loaders.config');

const dev = process.env.NODE_ENV !== 'production';

const options = {
    devtool: dev ? 'eval-source-map' : null,
    watch: dev,
    output: {
        publicPath: '/js/',
        filename: dev ? '[name].js' : '[chunkhash:12].js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpackStream.webpack.optimize.OccurenceOrderPlugin(),
        new webpackStream.webpack.NoErrorsPlugin(),
        new webpackStream.webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        loaders: loaders
    }
}

if (!dev) {
    options.plugins.push(new AssetsPlugin({
        filename: 'js.json',
        path: 'manifest',
        processOutput(assets) {
            for (let key in assets) {
                assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
                delete assets[key];
            }
            return JSON.stringify(assets);
        }
    }));
}

module.exports = options;
