/**
 * Module Dependencies
 */

const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync({
    proxy: "localhost:5000",  // local node app address
    port: 8000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', (cb) => {
  var called = false;
  return nodemon({
    script: 'index.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('work', ['browser-sync'], () => {
  gulp.watch(['public/*', 'public/**/*', 'views/*', 'index.js'], reload);
});