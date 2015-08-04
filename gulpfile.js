var gulp  = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('build', ['lint', 'copyVendorJs', 'scripts', 'copyIndex', 'copyTemplates'], function() {
  gulp.src('').pipe(livereload());
});

gulp.task('buildProduction', ['lint', 'copyVendorJs', 'scriptsProduction', 'copyIndex', 'copyTemplates'], function() {

});

gulp.task('copyVendorJs', function() {
  gulp.src(['bower_components/angular/angular.min.*', 'bower_components/angular-ui-router/release/angular-ui-router.min.js']).pipe(gulp.dest('target/script/vendor'));
});

gulp.task('scripts', function() {
  return gulp.src('script/**/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('target/script/'))
      .pipe(rename('all.min.js'))
      .pipe(gulp.dest('target/script/'));
});

gulp.task('scriptsProduction', function() {
  return gulp.src('script/**/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('target/script/'))
      .pipe(rename('all.min.js'))
      .pipe(uglify()).on('error', function(err) { console.log(err); })
      .pipe(gulp.dest('target/script/'));
});

gulp.task('copyIndex', function() {
  return gulp.src('index.html')
      .pipe(gulp.dest('target/'));
});

gulp.task('copyTemplates', function() {
  return gulp.src('script/route/**/*.html')
      .pipe(rename({dirname: ''}))
      .pipe(gulp.dest('target/template'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('script/**/*', ['build']);
  gulp.watch('index.html', ['build']);
});

gulp.task('lint', function() {
    return gulp.src('script/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
