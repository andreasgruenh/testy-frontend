var gulp  = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var autoprefixer = require('autoprefixer');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('build', ['lint', 'copyVendorJs', 'copyVendorCss', 'copyFonts', 'styles', 'scripts', 'copyIndex', 'copyTemplates'], function() {
  gulp.src('').pipe(livereload());
});

gulp.task('buildProduction', ['lint', 'copyVendorJs', 'copyVendorCss', 'copyFonts', 'styles', 'scriptsProduction', 'copyIndex', 'copyTemplates'], function() {

});

gulp.task('copyVendorJs', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/lodash/dist/lodash.min.js',
    ]).pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('target/script/vendor/'));
});

gulp.task('copyVendorCss', function() {
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest('target/style/vendor/'));
});

gulp.task('copyFonts', function() {
  gulp.src([
    'bower_components/font-awesome/fonts/*',
    'bower_components/bootstrap/fonts/*'
  ]).pipe(gulp.dest('target/style/fonts/'));
});

gulp.task('scripts', function() {
  return gulp.src(['script/testy.js', 'script/**/*.js'])
      .pipe(concat('all.js'))
      .pipe(gulp.dest('target/script/'))
      .pipe(rename('all.min.js'))
      .pipe(gulp.dest('target/script/'));
});

gulp.task('scriptsProduction', function() {
  return gulp.src(['script/testy.js', 'script/**/*.js'])
      .pipe(concat('all.js'))
      .pipe(gulp.dest('target/script/'))
      .pipe(rename('all.min.js'))
      .pipe(uglify()).on('error', function(err) { console.log(err); })
      .pipe(gulp.dest('target/script/'));
});

gulp.task('styles', function() {
  return gulp.src('style/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(postcss([autoprefixer({ browsers: ['> 5%'] })]))
    .pipe(gulp.dest('target/style'));
});

gulp.task('copyIndex', function() {
  return gulp.src('index.html')
      .pipe(gulp.dest('target/'));
});

gulp.task('copyTemplates', function() {
  return gulp.src('script/**/*.html')
      .pipe(rename({dirname: ''}))
      .pipe(gulp.dest('target/template'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('script/**/*', ['build']);
  gulp.watch('style/**/*', ['build']);
  gulp.watch('index.html', ['build']);
  gulp.start('build');
});

gulp.task('lint', function() {
    return gulp.src('script/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
