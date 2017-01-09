const gulp = require('gulp');
const path = require('path');
const gulpif = require('gulp-if');
const revReplace = require('gulp-rev-replace');
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rev = require('gulp-rev');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const webpackStream = require('webpack-stream');

const dev = process.env.NODE_ENV !== 'production';
const webpackOptions = require('./webpack.config.js');

/** @gulp: default task */
gulp.task('default', ['dist', 'watch'], function() {
    require('gulp-develop-server').listen({
        path: './index.js',
        execArgv: [ '--harmony' ]
    })
});

/** @gulp: make dist */
gulp.task('dist', ['js', 'stylus', 'assets'], function() {
    return gulp.src('src/index.html')
        .pipe(gulpif(!dev, revReplace({
            manifest: gulp.src('manifest/js.json')
        })))
        .pipe(gulpif(!dev, revReplace({
            manifest: gulp.src('manifest/stylus.json')
        })))
        .pipe(gulp.dest('dist'));
});

/** @gulp: make javascript */
gulp.task('js', function(done) {
    gulp.src('src/bootstrap.js')
        .pipe(named())
        .pipe(plumber())
        .pipe(webpackStream(webpackOptions))
        .pipe(gulpif(!dev, uglify()))
        .pipe(gulp.dest('dist/js'))
        .on('data', function() {
            if (!done.called) {
                done.called = true;
                done();
            }
        })
});

/** @gulp: make styles */
gulp.task('stylus', function() {
    return gulp.src('src/stylus/style.styl')
        .pipe(plumber())
        .pipe(stylus({ compress: !dev, 'include css': true }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpif(!dev, rev()))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulpif(!dev, rev.manifest('stylus.json')))
        .pipe(gulpif(!dev, gulp.dest('manifest')))
});

/** @gulp: copy assets */
gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist'));
});

/** @gulp: watch task */
gulp.task('watch', function() {
    gulp.watch('src/**/*.styl', ['stylus']);
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/index.html', ['dist']);
});
