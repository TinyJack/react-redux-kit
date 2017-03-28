const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');
const gutil = require('gulp-util');
const stylus = require('gulp-stylus');
const eslint = require('gulp-eslint');
const revReplace = require('gulp-rev-replace');
const webpackStream = require('webpack-stream');
const autoprefixer = require('gulp-autoprefixer');
const assetsPlugin = require('assets-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

/**
 * Skipping middleware for dev mode
 */
function skip() {
    gutil.log(gutil.colors.red.bold('::WEBPACK DEV PLUGINS ON DEMAND::'));
    gutil.log(gutil.colors.red.bold(process.env.));
}

/**
 * Ending task thread when done
 * @param done, task callback
 * @returns {Function}
 */
function end(done) {
    return function () {
        if (!done.called && debug) {
            done.called = true;
            done.call();
        }
    };
}

const jsxRules = {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy'],
        },
    }],
};

const options = {
    autoprefixer: {
        browsers: ['last 2 versions'],
        cascade: false,
    },
    stylus: {
        compress: !debug,
        'include css': true,
    },
    webpack: {
        devtool: debug ? 'eval-source-map' : false,
        watch: debug,
        output: {
            publicPath: '/js/',
            filename: debug ? '[name].js' : '[chunkhash:12].js',
        },
        module: {
            rules: [!debug ? jsxRules : Object.assign(jsxRules, { use: jsxRules.use.concat('eslint-loader') })], // TODO: replace with {...spread} in future
        },
        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    GOOGLE_KEY: JSON.stringify(process.env.GOOGLE_KEY),
                    GOOGLE_SENDER: JSON.stringify(process.env.GOOGLE_SENDER),
                },
            }), !debug ? new assetsPlugin({
                    filename: 'react.json',
                    path: 'manifest',
                    processOutput(assets) {
                        for (const key in assets) {
                            assets[`${key}.js`] = assets[key].js.slice('/js/'.length);
                            delete assets[key];
                        }
                        return JSON.stringify(assets);
                    },
                }) : skip,
        ],
    },
};

/** @gulp: default -> dist -> react */
gulp.task('react', done => {
    return gulp.src('src/bootstrap.js')
        .pipe(named())
        .pipe(plumber())
        .pipe(webpackStream(options.webpack, webpack))
        .pipe(gulpif(!debug, uglify()))
        .pipe(gulp.dest('dist/js'))
        .on('data', end(done, debug));
});

/** @gulp: default -> dist -> assets */
gulp.task('assets', () => {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist'));
});

/** @gulp: default -> dist -> stylus */
gulp.task('stylus', () => {
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
gulp.task('dist', ['react', 'assets', 'stylus'], () => {
    return gulp.src('src/index.html')
        .pipe(gulpif(!debug, revReplace({
            manifest: gulp.src('manifest/react.json'),
        })))
        .pipe(gulpif(!debug, revReplace({
            manifest: gulp.src('manifest/stylus.json'),
        })))
        .pipe(gulp.dest('dist'));
});

/** @gulp: default -> watch */
gulp.task('watch', () => {
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/**/*.styl', ['stylus']);
});

/** @gulp: test -> dist */
gulp.task('test', ['dist'], function() {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/** @gulp: default */
gulp.task('default', ['dist', 'watch'], () => {
    require('gulp-develop-server').listen({
        path: './server.js',
        execArgv: ['--harmony'],
    });
});
