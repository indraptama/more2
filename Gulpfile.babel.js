
import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import browserSync, { reload } from 'browser-sync';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import notify from 'gulp-notify';
import rimraf from 'rimraf';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';
import uglify from 'gulp-uglify';


import jade from 'gulp-pug';

import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import cssImport from 'postcss-import';

const paths = {
  bundle: 'app.js',
  srcJSX: 'src/index.js',
  srcCSS: 'src/style.css',
  srcCSSAll: 'src/**/*.css',
  srcIMG: 'src/img/**',
  srcJADE: 'src/html/*.jade',
  partJADE: 'src/html/**/*.jade',
  componentsJADE: 'src/components/**/*.jade',
  DATA: 'asset/data/**/*.{js,json}',
  dist: 'dist',
  distJS: 'dist/js',
  distCSS: 'dist/css',
  distImg: 'dist/img',
};

const customOpts = {
  entries: [paths.srcJSX],
  debug: true,
};
const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('html', () => {
  gulp.src(paths.srcJADE)
  .pipe(sourcemaps.init())
  .pipe(jade({
    pretty: true,
  }))
  .on('error', notify.onError())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dist))
  .pipe(reload({ stream: true }));
});

gulp.task('styles', () => {
  gulp.src(paths.srcCSS)
  .pipe(sourcemaps.init())
  .pipe(postcss([cssImport, cssnext]))
  .on('error', notify.onError())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distCSS))
  .pipe(reload({ stream: true }));
});

// JS Task
gulp.task('watchify', () => {
  const bundler = watchify(browserify(opts));

  function rebundle() {
    return bundler.bundle()
    .on('error', notify.onError())
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJS))
    .pipe(reload({ stream: true }));
  }
  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', () => {
  browserify(paths.srcJSX, { debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJS));
});

// browserSync
gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './dist',
    },
  });
});


// Linting JS
gulp.task('lint', () => {
  gulp.src(paths.srcJSX)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('copies', () => {
  gulp.src([
    './asset/data/**/*.*',
    './asset/fonts/**/*.*',
    './asset/img/**/*.*',
    './asset/js/**/*.*',
    './asset/css/**/*.*',
  ], { 'base': './asset' })
  .pipe(gulp.dest('./dist/asset'));
});

// Watch
gulp.task('watchTask', () => {
  gulp.watch(paths.srcCSS, ['styles']);
  gulp.watch(paths.srcCSSAll, ['styles']);
  gulp.watch(paths.srcJSX, ['lint']);
  gulp.watch(paths.partJADE, ['html']);
  gulp.watch(paths.srcJADE, ['html']);
  gulp.watch(paths.componentsJADE, ['html']);
});

// Cleaning
gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('default', cb => {
  runSequence('clean', ['browserSync', 'watchTask', 'watchify', 'styles', 'lint'], cb);
});


gulp.task('watch', cb => {
  runSequence('clean', ['browserSync', 'watchTask', 'watchify', 'styles', 'lint', 'html', 'copies'], cb);
});

gulp.task('watchRiot', cb => {
  runSequence('clean', ['browserSync', 'watchTask', 'watchifyRiot', 'styles', 'lint', 'html', 'copies'], cb);
});


gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'styles', 'html', 'copies'], cb);
});
