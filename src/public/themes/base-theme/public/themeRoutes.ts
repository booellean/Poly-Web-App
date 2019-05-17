/////////////////////////////////////////////////////////////////////////////////
////////////////////// Exported Routes for Current Theme ////////////////////////
/////////////////////////////////////////////////////////////////////////////////


// Primary Route exports
// Primarily used in the following locations
// App.ts
// src/controllers

export const ThemeRoutes = {
  themeName : 'base-theme',
  mainRoute : 'themes/base-theme'
};

// Route Exports for Gulpfile
// Anything that does not need to be compiled
// (i.e. EJS templates, fonts, etc...)
// Should have their routes defined in gulpTransfer

export const gulpScss = [
  {
    name : 'scssMain',
    src : './src/public/themes/base-theme/public/scss/**/*.scss',
    dest : './dist/public/themes/base-theme/public/css'
  }
];

export const gulpJs = [
  {
    name: 'jsMain',
    src: './src/public/themes/base-theme/public/js/*.js',
    dest : './dist/public/themes/base-theme/public/js/'
  },
  {
    name: 'jsPublic',
    src : './src/public/themes/base-theme/public/*.js',
    dest : './dist/public/themes/base-theme/public/'
  }
];

export const gulpImg = [
  {
    name : 'imgMain',
    src : './src/public/public/themes/base-theme/public/img/*.{jpg,png,gif}',
    dest : './dist/public/themes/base-theme/public/img/'
  }
];

//TODO: Images are currently being transferred... Need to standardize this
export const gulpTransfer = [
  {
    name : 'mainEjsPartials',
    src : './src/public/themes/base-theme/views/partials/*.ejs',
    dest : './dist/public/themes/base-theme/views/partials/'
  },
  {
    name : 'mainEjsPages',
    src : './src/public/themes/base-theme/views/pages/*.ejs',
    dest : './dist/public/themes/base-theme/views/pages/'
  },
  {
    name : 'mainFonts',
    src : './src/public/themes/base-theme/public/fonts/*.ttf',
    dest : './dist/public/themes/base-theme/public/fonts/'
  },
  {
    name : 'manifest',
    src : './src/public/themes/base-theme/public/*.json',
    dest : './dist/public/themes/base-theme/public/'
  },
  {
    name : 'imgMain',
    src : './src/public/themes/base-theme/public/img/*.{jpg,png,gif}',
    dest : './dist/public/themes/base-theme/public/img/'
  }
];