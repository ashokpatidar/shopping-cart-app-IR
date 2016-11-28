/****** Description *************
  File: gulpfille.js
  Author: Ashok Patidar
********* End ******/
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    tinylr = require('tiny-lr')(),
    open = require('gulp-open'),
    

    angularLibraries = [
      'app/vendors/angular-1.4.8/angular.js',
      'app/vendors/angular-1.4.8/angular-resource.js',
      'app/vendors/angular-1.4.8/angular-ui-router.js'
    ];
	
gulp.task('styles', function() {
  return sass('app/assets/sass', { style: 'expanded' })
    .pipe(gulp.dest('app/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/assets/css/dest'))
    //.pipe(browserSync.stream());
});

gulp.task('index', function () {
  return gulp.src('index.html')
    .pipe(inject(series(
      gulp.src(angularLibraries , {read: false}), 
      gulp.src(['app/vendors/*.js'], {read: false}), 
      gulp.src(['app/scripts/**/*.js', 'app/assets/css/*.css'], {read: false})
    ), {relative: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('app-js-build', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/dist'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));
});

gulp.task('vendors-js-build', function() {
  return gulp.src('app/vendors/*.js')
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('app/dist'))
    .pipe(rename('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));
});

gulp.task('angular-js-build', function() {
  return gulp.src(angularLibraries)
    .pipe(concat('angular.js'))
    .pipe(gulp.dest('app/dist'))
    .pipe(rename('angular.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));
});

gulp.task('index-build', ['app-js-build','vendors-js-build', 'angular-js-build'], function () {  
  return gulp.src('index.html').pipe(inject(gulp.src([
      'app/dist/angular.min.js',
      'app/dist/vendors.min.js',
      'app/dist/main.min.js'
      ], {read: false}), {relative: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('livereload', ['express'], function() {
  tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  console.log(fileName + " Changed");
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('express', ['styles'], function() {
  var express = require('express');
  var app = express();
  var port = 4000;
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(port, function(){
    console.log('Now serving http://localhost:'+port+'/index.html');  
  }); 

  gulp.src(__filename).pipe(open({
    uri: 'http://localhost:' + port,
    app: 'chrome'
  }));
});

gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: "./"
    });
});

gulp.task('watch', function() {
  gulp.watch('**/*.scss', ['styles']);
  gulp.watch(['*.html', 
    'app/assets/css/*.css', 
    'app/scripts/**/*.js', 
    'app/scripts/**/*.html'], notifyLiveReload);
});

gulp.task('watch-static', function() {
  gulp.watch('**/*.scss', ['styles']);
  gulp.watch(['*.html', 
    'app/assets/css/*.css', 
    'app/scripts/**/*.js', 
    'app/scripts/**/*.html']);
});

gulp.task('sass', ['styles', 'watch-static'], function() {});
gulp.task('build', ['index-build'], function() {});
gulp.task('release', ['index'], function() {});
gulp.task('default', ['livereload', 'watch'], function() {
  /*return gulp.src('server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('app/vendors'));*/
});

/***
  Instruction to Install gulp
  
  Install gulp Globally
  $ sudo npm install gulp -g
  
  Installing SASS
  $ sudo gem install sass

  browserSync.reload - To notify browser to reload.
**/