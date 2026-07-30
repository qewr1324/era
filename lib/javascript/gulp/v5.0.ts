export function generate(params: any): string {
	return `const gulp = require('gulp');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');

function scripts() {
  return gulp.src('src/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
}

function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

function images() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

function watch() {
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/images/**/*', images);
}

exports.default = gulp.parallel(scripts, styles, images);
exports.watch = watch;`;
}
