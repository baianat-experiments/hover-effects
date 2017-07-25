/**
 * gulp modules
 */
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const rename = require("gulp-rename");
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

/**
 * browser Sync
 */
const browserSync = require('browser-sync');
const reload = browserSync.reload;


/**
 * Styles task
 */
gulp.task('styles', () => {
  gulp.src('./src/stylus/hover.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(rename({
      basename: "hover",
      suffix: "",
      extname: ".css"
    }))
    .pipe(autoprefixer('last 5 version'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});


/**
 * production styles task
 */
gulp.task('production:styles', () => {
  gulp.src('./src/stylus/app.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename({
      basename: "hover",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * production  task
 */
gulp.task('production', ['styles', 'production:styles']);

/**
 * Browser-sync task
 */
gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: "hover.dev/index.html"
  });
});

/**
 * Watch task
 */
gulp.task('watch', () => {
  gulp.watch('./src/stylus/**/*.styl', ['styles']);
  gulp.watch('./**/*.html', () => {
    gulp.src('./**/*.html').pipe(reload({ stream: true }));
  });
});

/**
 * Default task
 */
gulp.task('default', ['styles', 'browser-sync', 'watch']);
