var gulp = require('gulp');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./",
          index: "index.html"
      }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task( 'default', gulp.series( gulp.parallel( 'browser-sync' ) ), function() {
  gulp.watch( './*.html', gulp.task( 'bs-reload' ) );
  gulp.watch( './common/css/*.css', gulp.task( 'bs-reload' ) );
  gulp.watch( './common/js/*.js', gulp.task( 'bs-reload' ) );
  gulp.watch( './img/js/*.mp4', gulp.task( 'bs-reload' ) );
});


gulp.task('mincss', function() {
  return gulp.src("common/css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('common/css/'));
});

gulp.task('minjs', function() {
  return gulp.src("common/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('common/js/'));
});


var imageminOption = [
  imageminPngquant({ quality: [0.65, 0.8] }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo()
];

gulp.task( 'imagemin', function() {
  return gulp
    .src( './img/*.{png,jpg,gif,svg,mp4}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './img' ) );
});


gulp.task('sass', function() {
  return gulp.src('./common/css/**/*.scss', gulp.task('sass'))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

gulp.task( 'watch', function() {
  gulp.watch( './common/css/**/*.scss', gulp.task( 'sass' ) );
});
