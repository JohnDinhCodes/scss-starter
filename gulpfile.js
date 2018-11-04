const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');


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

    gulp.watch('./app/sass/**/*.scss', () => {
        gulp.start('cssInject');
    })
});

gulp.task('styles', () => {
    return gulp.src('./app/sass/**/*.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ // COULD PROBABLY ONLY USE THIS WHEN BUILDING
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(cssnano()) // COULD PROBABLY ONLY USE THIS WHEN BUILDING
    .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/assets/css/main.css')
    .pipe(browserSync.stream());
    
})