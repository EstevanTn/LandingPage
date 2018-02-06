var gulp = require('gulp'), 
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
imagemin = require('gulp-imagemin'),
coffee = require('gulp-coffee'),
minifyCSS = require('gulp-minify-css')
rename = require('gulp-rename'),
pug = require('gulp-pug'),
concat = require('gulp-concat'),
autoprefixer = require('autoprefixer'),
cssnano = require('cssnano'),
postcss = require('gulp-postcss'),
webpack = require('gulp-webpack'),
webserver = require('gulp-webserver');

let postcssPlugins = [
    autoprefixer({browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'}),
    cssnano({core:true})
];

gulp.task('dev', ['uglify', 'scss', 'watch', 'webserver']);
gulp.task('test', ['webserver', 'watch']);

gulp.task('uglify', function() {
    gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/min'));
});

gulp.task('scripts', function() {
    gulp.src('dist/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('scss',function() {
    gulp.src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function() {
    gulp.src('images/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('coffee', function() {
    gulp.src('src/coffee/**/*.coffee')
    .pipe(plumber())
    .pipe(coffee({bare: true}).on('error', function(err){
        console.log(err.name + " en " + err.plugin);
    }))
    .pipe(gulp.dest('dist/jssrc'));
});


gulp.task('mincss', function() {
    gulp.src('dist/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/min'))
});

gulp.task('views', function buildHTML() {
    gulp.src('views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename({ extname: '.html'}))
    .pipe(gulp.dest('public'))
});

gulp.task('webpack', function() {
    gulp.src('dist/jssrc/index.js')
    .pipe(webpack())
    .pipe(concat('all.bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', function() {
    gulp.src('dist')
    .pipe(webserver({
        //directoryListing: true,
        //host: '0.0.0.0',
        //port: 6639,
        livereload: true,
        //open: true,
        fallback: 'index.html'
    }));
});

gulp.task('watch', function() {
    //gulp.start(['webserver']);
    gulp.watch('src/coffee/**/*.coffee', ['coffee']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('images/**/*.{jpg,jpeg,png,gif}', ['imagemin']);
    gulp.watch('views/**/*.pug', ['views']);
    gulp.watch('dist/jssrc/**/*.js', ['webpack']);
    gulp.watch('js/**/*.js', ['uglify']);
});



