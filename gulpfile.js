const changed = require('gulp-changed')
const del = require('del')
const gulp = require('gulp')
const squoosh = require('gulp-libsquoosh')

var paths = {
  images: {
    src: 'src/images/**',
    dest: 'dist/images/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(['dist']);
}

/*
 * Define our tasks using plain functions
 */
function images() {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(squoosh(
      {
        encodeOptions: {
          webp: {
            quality: 75,
          }
        }
    }))
    .pipe(gulp.dest(paths.images.dest));
}

function watch() {
  gulp.watch(paths.images.src, images);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(images, gulp.parallel(images, watch));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.images = images;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
