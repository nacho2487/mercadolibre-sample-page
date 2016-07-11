var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var rename = require('gulp-rename');


var paths = {
    images: './src/images/*',
    sass: './src/css/**/*.scss',
    libs: './src/css/**/libs/*.css',
    html: './src/*.html',
    js: ['./node_modules/jquery/dist/jquery.min.js', './node_modules/tiny.js/dist/tiny.min.js', './node_modules/chico/dist/ui/chico.min.js', './src/js/*.js' ],
    assets: './node_modules/chico/dist/assets/*'
};

gulp.task('build', ['images', 'html', 'styles', 'scripts']);

gulp.task('watch', function () {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.sass, ['styles']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.js, ['scripts']);
});

gulp.task('clean', function() {
    return gulp.src("dist/*", { read: false }).pipe(clean());
});

gulp.task('images',  function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', ['libs'], function () {
    return gulp
        .src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('libs', function () {
    return gulp
        .src(paths.libs)
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', ['assets'], function() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('assets', function () {
    return gulp
        .src(paths.assets)
        .pipe(gulp.dest('./dist/assets/'));
});