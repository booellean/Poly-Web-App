'use strict';

const gulp = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const responsive = require('gulp-responsive');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

// compile sass to css, prefix it, minify it, and rename to min file
gulp.task('sass', ()=> {
  return gulp.src('./src/public/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(rename({ suffix: ".min", }))
    .pipe(gulp.dest('./dist/public/css'))
});

//build all images to responsive sizes
gulp.task('img-build', ()=> {
  return gulp.src('./src/public/img/*.{jpg,png}')
    .pipe(responsive({
      '*': [{
        width: 200,
        rename: { suffix: '-200' },
      }, {
        width: 400,
        rename: { suffix: '-400' },
      }, {
        width: 600,
        rename: { suffix: '-600' },
      },{
        width: 800,
        rename: { suffix: '-800' },
      },{
        width: 1000,
        rename: { suffix: '-1000' },
      },{
        width: 1200,
        rename: { suffix: '-1200' },
      }]
    }, {
      // Global configuration for all images
      quality: 85,
      progressive: true,
      withoutEnlargement: false
    }))
    .pipe(gulp.dest('./dist/public/img/'));
});

//minify all html (only index for now)
gulp.task('html-min', ()=> {
  return gulp.src('./src/public/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/public/'));
});

//uglify all javascript that has been compiled from our tsconfig.json, and suffix it .min
gulp.task('uglify', ()=> {
  return gulp.src('./dist/public/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: ".min", }))
    .pipe(gulp.dest('./dist/public/js/'))
});

//copy over all files that don't have to be minified or altered in any way, i.e. fonts
gulp.task('build', ()=>{
  return gulp.src('./src/public/fonts/*')
    .pipe(gulp.dest('./dist/public/fonts/'))
})

//copy over all files that will not need to be changed
gulp.task('transfer', ()=>{
  return gulp.src('./src/views/*')
    .pipe(gulp.dest('./dist/views/'))
})

gulp.task('watch', function () {
  gulp.watch('./src/public/scss/**/*.scss', ['sass']);
  // gulp.watch('./src/**/*.html', ['html-min']);
  gulp.watch('./dist/public/js/**/*.js', ['uglify']);
  gulp.watch('./src/views/**/*.ejs', ['transfer']);
});