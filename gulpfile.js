'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');

/**
 * Validate .js soruce before transforming.
 */
gulp.task('lint', function() {
	return gulp.src('./dynamic-images.js')
		// eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

/**
 * Transform .js source for backward compatibility.
 */
gulp.task('js', function() {
	return gulp.src('./dynamic-images.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream())
});

/**
 * Minify .js srouce for optimization.
 */
gulp.task('minify', function() {
	return gulp.src('./dist/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/'))
});

/**
 * Setup static server
 */
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	// Watch for ./*.js file changes.
	gulp.watch('./dynamic-images.js', ['lint', 'js']);

	// Watch for .html file changes.
	gulp.watch('./**/*.html').on('change', browserSync.reload);
})

/**
 * While still on development.
 */
gulp.task('dev', ['lint', 'js', 'serve']);
gulp.task('default', ['dev']);

/**
 * Build assets for production.
 */
gulp.task('build', ['lint', 'js', 'minify']);