const {src,dest,watch,parallel} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const bwSync = require('browser-sync').create();
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cached = require('gulp-cached');
const fileinclude = require('gulp-file-include');
const include = require('gulp-include')
const path = require('path') 
const gulp = require('gulp');

function scripts() {
    return src('app/script/app.js')
    .pipe(concat('main.js'))
    .pipe(dest('dist'))
    .pipe(bwSync.stream());
}


function fileincludeHTML() {
    return src('app/*.html')
        .pipe(fileinclude({
             prefix: '@@',
          }))
        .pipe(gulp.dest('dist'));
}

function images(){
    return src('app/src/*.*', '!app/src/*svg')
    .pipe(avif({quality:50}))
    .pipe(src('app/src/*.*'))
    .pipe(webp())
    .pipe(dest('dist/img'))
    .pipe(imagemin())
}

function styles(){
    return src('app/scss/*.scss','!import',{allowEmpty: true })
    .pipe(concat('style.css'))
    .pipe(scss({outputStyle:"compressed"}))
    .pipe(dest('dist'))
    .pipe(bwSync.stream());

}

function watching(){
    watch(['app/scss/*.scss'],styles);
    watch(['app/script/app.js'],scripts);
    watch(['app/html/*'],fileincludeHTML);
    watch(['app/*.html']).on('change', bwSync.reload);
}

function browserSync(params) {
    bwSync.init({
      proxy:'http://127.0.0.1:5501/dist/index.html'
    })
  } 
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browserSync = browserSync;
exports.images = images;
exports.fileincludeHTML = fileincludeHTML
exports.default = parallel(styles,scripts,browserSync,fileincludeHTML,watching);