const webpack = require('webpack-stream').webpack;
const loaders = require('./loaders.config');

const dev = process.env.NODE_ENV !== 'production';

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            './test/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            './test/*.spec.js': ['webpack']
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: dev,
        browsers: ['PhantomJS'],
        singleRun: !dev,
        concurrency: Infinity,
        webpack: {
            module: {
                loaders: loaders
            }
        }
    })
}
