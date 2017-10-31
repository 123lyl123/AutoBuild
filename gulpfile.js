'use strict';
var gulp = require('gulp'),
    jshint = require('gulp-jshint'), //代码验证检查
    uglify = require('gulp-uglify'), //压缩js代码
    rename = require('gulp-rename'), //文件重命名
    concat = require('gulp-concat'), //合并js文件
    notify = require('gulp-notify'), //更改提醒
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    livereload = require('gulp-livereload'); //自动刷新页面

//js代码校验、合并和压缩（类似jquery的链式操作，牛）
gulp.task('scripts', function() {
    return gulp.src('src/airplane/**/*.js') //源文件
        .pipe(jshint.reporter('default'))
        .pipe(concat('index.js')) //2、合并js文件
        .pipe(gulp.dest('dist/airplane/js/')) //合并后文件存放位置
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify()) //3、执行压缩任务
        .pipe(gulp.dest('dist/airplane/js/')) //压缩后文件存放位置
        .pipe(notify({ //4、操作结束后提示
            message: 'Scripts task complete'
        }));
});

gulp.task('css', function() {
    return gulp.src('src/airplane/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/airplane/css/'))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('dist/airplane/css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssmin()) //压缩css
        .pipe(gulp.dest('dist/airplane/css/'))
        .pipe(notify({ //4、操作结束后提示
            message: 'less task complete'
        }));
});

// 默认任务，这里完全可以是多个任务，比如压缩CSS，压缩图片，压缩js等
gulp.task('default', ['watch'], function() {
    gulp.start('scripts');
    gulp.start('css');
});
// 监听（前端自动化的情怀）~
gulp.task('watch', function() {
    // 监听 .js文件改动，一旦改动就会自动压缩合并
    gulp.watch('src/airplane/js/*', ['scripts']);
    gulp.watch('src/airplane/less/*', ['css']);
    // Create LiveReload server（用来自动刷新浏览器）
    livereload.listen();
});