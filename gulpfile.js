/* 

    Gulpfile for SASS -> CSS conversion, JS combination and minification of Bootstrap files and a custom theme.

*/

// Include Gulp
var gulp = require('gulp');

// Include Plugins
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var size = require('gulp-size');
var bytediff = require('gulp-bytediff');

var bootstrapDir = 'resources/styles/bootstrap-sass';

// Define a task for converting SASS files to CSS minifying and saving in dist/css folder:
gulp.task('sass', function () {
    gulp.src('resources/styles/main.scss')
        .pipe(sass({
         includePaths: [bootstrapDir + '/stylesheets', 'resources/styles']
        }))
        .pipe(prefixer('last 5 versions', 'ie 8'))
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(bytediff.start())
        .pipe(minifycss())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(bytediff.stop());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            bootstrapDir + '/javascripts/bootstrap/transition.js',
            bootstrapDir + '/javascripts/bootstrap/alert.js',
            bootstrapDir + '/javascripts/bootstrap/button.js',
            bootstrapDir + '/javascripts/bootstrap/carousel.js',
            bootstrapDir + '/javascripts/bootstrap/collapse.js',
            bootstrapDir + '/javascripts/bootstrap/dropdown.js',
            bootstrapDir + '/javascripts/bootstrap/modal.js',
            bootstrapDir + '/javascripts/bootstrap/tooltip.js',
            bootstrapDir + '/javascripts/bootstrap/popover.js',
            bootstrapDir + '/javascripts/bootstrap/scrollspy.js',
            bootstrapDir + '/javascripts/bootstrap/tab.js',
            bootstrapDir + '/javascripts/bootstrap/affix.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(bytediff.start())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(bytediff.stop());
});



// Define a task to watch changes in js and sass folders
gulp.task('watch', function () {
    //gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch(bootstrapDir +'/stylesheets/bootstrap/*.scss', ['sass']);
    gulp.watch('resources/styles/*.scss', ['sass']);
});

// Define a default task
gulp.task('default', ['sass', 'scripts', 'watch']);