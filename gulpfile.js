'use strict';

//Define dependencies
const gulp = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const responsive = require('gulp-responsive');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

//Define Compilers
sass.compiler = require('node-sass');

//Define imported Themes Routes
//TODO: define a way to programatically define the active themeRoute
const themeRoute = require('./src/public/themes/base-theme/public/themeRoutes');

const themeScss = themeRoute.gulpScss;
const themeJs = themeRoute.gulpJs;
const themeImg = themeRoute.gulpImg;
const themeTransfer = themeRoute.gulpTransfer;

//Define admin Routes
const adminScss = [];
const adminJs = [
  {
    name : 'controllerJs',
    src : './src/controllers/*.js',
    dest : './dist/controllers/'
  },
  {
    name : 'modelJs',
    src : './src/models/*.js',
    dest : './dist/models/'
  },
  {
    name : 'routeJs',
    src : './src/routes/*.js',
    dest : './dist/routes/'
  },
  {
    name : 'serverJs',
    src : './src/*.js',
    dest : './dist/'
  }
];
//TODO, change to a temporary folder that will create responsive images and write to folder
//TODO, or change this so it only changes one file that was uploaded and discards the task immediately...
//TOODO Pass some variables or something??? In a function.....
const adminImg = [
  {
    name: 'adminAssets',
    src: './assets/users/booellean/images/*{jpg,png}',
    dest: './assets/users/booellean/images/'
  }
];
const adminTransfer = [
  {
    name : 'adminEjsPages',
    src : './src/views/pages/*.ejs',
    dest : './dist/views/pages/',
  },
  {
    name : 'adminEjsPartials',
    src : './src/views/partials/*.ejs',
    dest : './dist/views/partials/',
  },
  {
    name : 'fontAwesomeFonts',
    src : './node_modules/font-awesome/fonts/*',
    dest : './assets/font-awesome/fonts/',
  },
  {
    name : 'fontAwesomeCss',
    src : './node_modules/font-awesome/css/*',
    dest : './assets/font-awesome/css/',
  }
];

//Combine all defined admin and theme route objects
const allScss = [...themeScss, ...adminScss];
const allJs = [...themeJs, ...adminJs];
const allImg = [...themeImg, ...adminImg];
const allTransfers = [...themeTransfer, ...adminTransfer];

//Define Watch Routes, to be generated at task generation
const watchScssRoutes = [];
const watchJsRoutes = [];
const watchImgRoutes = [];
const watchTransferRoutes = [];

//Define build array
const buildArr = [];

// compile sass to css, prefix it, minify it, and rename to min file

allScss.forEach( (option) =>{
  gulp.task(option.name, ()=> {
    return gulp.src(option.src)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(csso())
      .pipe(rename({ suffix: ".min", }))
      .pipe(gulp.dest(option.dest))
  });
  watchScssRoutes.push({name : option.name, route : option.src });
  buildArr.push(option.name);
});

//build all images to responsive sizes
//TODO: Fix image tasks... currently not working.
//Maybe transfer main images from a theme and use this for all uploaded images?
allImg.forEach( (option) =>{
  gulp.task(option.name, ()=> {
    return gulp.src(option.src)
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
      .pipe(gulp.dest(option.dest));
  });
  watchImgRoutes.push({name : option.name, route : option.src });
  // buildArr.push(option.name);
});

//uglify all javascript that has been compiled from our tsconfig.json
allJs.forEach( (option) =>{
  gulp.task(option.name, ()=> {
    return gulp.src(option.src)
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(option.dest))
  });
  watchJsRoutes.push({name : option.name, route : option.src });
  buildArr.push(option.name);
});

//copy over all files that will not need to be changed
allTransfers.forEach( (option) =>{
  gulp.task(option.name, ()=>{
    return gulp.src(option.src)
      .pipe(gulp.dest(option.dest))
  });
  watchTransferRoutes.push({name : option.name, route : option.src });
  buildArr.push(option.name);
});


gulp.task('watch', function () {
  //Build watch tasks for every destination
  watchJsRoutes.forEach( (option) =>{
    gulp.watch(option.route, [option.name]);
  });
  watchScssRoutes.forEach( (option) =>{
    gulp.watch(option.route, [option.name]);
  });
  watchTransferRoutes.forEach( (option) =>{
    gulp.watch(option.route, [option.name]);
  });
});

gulp.task('build', buildArr);