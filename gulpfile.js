const gulp          = require('gulp');
const named         = require('vinyl-named');
const webpack       = require('webpack');
const plumber       = require('gulp-plumber');
const uglify        = require('gulp-uglify');
const gulpif        = require('gulp-if');
const revReplace    = require('gulp-rev-replace');
const rev           = require('gulp-rev');
const stylus        = require('gulp-stylus');
const autoprefixer  = require('gulp-autoprefixer');
const webpackStream = require('webpack-stream');
const gutil         = require('gulp-util');
const assetsPlugin  = require('assets-webpack-plugin');
const debug         = process.env.NODE_ENV !== 'production';

const options = {
    autoprefixer: {
        browsers: ['last 2 versions'],
        cascade: false
    },
    stylus: {
        compress: !debug,
        'include css': true
    },
    webpack: {
        devtool: debug ? 'eval-source-map' : false,
        watch: debug,
        output: {
            publicPath: '/js/',
            filename: debug ? '[name].js' : '[chunkhash:12].js'
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy']
                }
            }, {
                test: /\.json?$/,
                exclude: /(node_modules)/,
                loader: 'json-loader'
            }]
        },
        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }
            }), !debug ? new assetsPlugin({
                filename: 'react.json',
                path: 'manifest',
                processOutput(assets) {
                    for (let key in assets) {
                        assets[key + '.js'] = assets[key].js.slice('/js/'.length);
                        delete assets[key];
                    }
                    return JSON.stringify(assets);
                }
            }) : skip
        ]
    }
}

function skip() {
    gutil.log(gutil.colors.red.bold('::WEBPACK DEV PLUGINS ON::'));
}

function end(done) {
    return function() {
        if (!done.called && debug) {
            done.called = true;
            done.call();
        }
    }
}

/** @gulp: default -> dist -> react */
gulp.task('react', function(done) {
    return gulp.src('src/bootstrap.js')
        .pipe(named())
        .pipe(plumber())
        .pipe(webpackStream(options.webpack, webpack))
        .pipe(gulpif(!debug, uglify()))
        .pipe(gulp.dest('dist/js'))
        .on('data', end(done, debug));
});

/** @gulp: default -> dist -> assets */
gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist'));
});

/** @gulp: default -> dist -> stylus */
gulp.task('stylus', function() {
    return gulp.src('src/stylus/style.styl')
        .pipe(plumber())
        .pipe(stylus(options.stylus))
        .pipe(autoprefixer(options.autoprefixer))
        .pipe(gulpif(!debug, rev()))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulpif(!debug, rev.manifest('stylus.json')))
        .pipe(gulpif(!debug, gulp.dest('manifest')));
});

/** @gulp: default -> dist */
gulp.task('dist', ['react', 'assets', 'stylus'], function() {
    return gulp.src('src/index.html')
        .pipe(gulpif(!debug, revReplace({
            manifest: gulp.src('manifest/react.json')
        })))
        .pipe(gulpif(!debug, revReplace({
            manifest: gulp.src('manifest/stylus.json')
        })))
        .pipe(gulp.dest('dist'));
});

/** @gulp: default -> watch */
gulp.task('watch', function() {
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/**/*.styl', ['stylus']);
});

/** @gulp: default */
gulp.task('default', ['dist', 'watch'], function() {
    require('gulp-develop-server').listen({
        path: './server.js',
        execArgv: ['--harmony']
    });
});
