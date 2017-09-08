var gulp = require('gulp'),
	sass = require('gulp-sass'),
	less = require('gulp-less'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	contentIncluder = require('gulp-content-includer'),
	runSequence = require('run-sequence'),
  autoprefixer = require('gulp-autoprefixer');

// 图片处理
gulp.task('images', function(){
  return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload());
});

// js处理
gulp.task('scripts', function(){
  return gulp.src('src/js/*.js')
    // .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// less处理
gulp.task('less', function(){
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

// sass处理
gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

// css处理
gulp.task('css', function(){
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

// 本地服务设置
gulp.task('server', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// concat;
gulp.task('concat',function() {
    gulp.src("dist/*.html")
      .pipe(contentIncluder({
          includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
      }))
      .pipe(gulp.dest('dist/'));
});


// 复制index
gulp.task('copy-index', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// 复制HTML文件；
gulp.task('copy-html',function(){
  return gulp.src('src/html/*.html')
    .pipe(gulp.dest('dist/html/'))
    .pipe(connect.reload());
});

// 字体
gulp.task('font',function(){
  return gulp.src('src/fonts/**/*.{css,eot,js,svg,ttf,woff}')
  .pipe(gulp.dest('dist/fonts/'))
  .pipe(connect.reload());
});

// 数据处理
gulp.task('data', function(){
  return gulp.src(['src/xml/*.xml', 'src/json/*.json', 'src/!json/secret.json'])
	.pipe(gulp.dest('dist/data'));
});

// media处理
gulp.task('media',function(){
  return gulp.src('src/media/**/*.mp4')
  .pipe(gulp.dest('dist/media'));
})


// build函数
gulp.task('build', ['sass', 'less', 'font', 'scripts', 'copy-index', 'copy-html', 'data', 'css', 'images','media'], function(){
  runSequence('concat');
  console.log('编译成功！');
});

// watch函数
gulp.task('watch', function(){
  gulp.watch('src/index.html', ['copy-index', 'concat']);
  gulp.watch('src/html/*.html',['copy-html','concat']);
  gulp.watch('src/img/**/*.{jpg,png}', ['images']);
  gulp.watch(['src/xml/*.xml', 'src/json/*.json', 'src/!json/secret.json'], ['data']);
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/fonts/**/*.{css,eot,js,svg,ttf,woff}',['font']);
  gulp.watch('src/media/**/*.mp4',['meida']);
});

// 执行函数
gulp.task('default', ['server', 'watch']);
