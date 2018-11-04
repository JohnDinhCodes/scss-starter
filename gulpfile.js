const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const webpack = require('webpack');


gulp.task('watch', ['styles'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./app"
        }
    })

    gulp.watch('./app/index.html', () => {
        browserSync.reload();
    })

    gulp.watch('./app/assets/sass/**/*.scss', () => {
        gulp.start('cssInject');
    })
});

gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/assets/sass/main.css')
    .pipe(browserSync.stream());
    
})

gulp.task('styles', () => {
    return gulp.src('./app/assets/sass/**/*.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ // COULD PROBABLY ONLY USE THIS WHEN BUILDING
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(cssnano()) // COULD PROBABLY ONLY USE THIS WHEN BUILDING
    .pipe(gulp.dest('./app/assets/sass'));
});

gulp.task('scripts', (callback) => {
    webpack(require('./webpack.config'), (err, stats) => {
        err ? console.log(err.toString()) :
        console.log(stats.toString());
        callback()
    });
});