'use strict';
var gulp = require('gulp'),
    jshint = require('gulp-jshint'), //代码验证检查
    uglify = require('gulp-uglify'), //压缩js代码
    rename = require('gulp-rename'), //文件重命名
    concat = require('gulp-concat'), //合并js文件
    notify = require('gulp-notify'), //更改提醒
    order = require('gulp-order'), //调整合并文件的顺序
    less = require('gulp-less'),    //css预编译文件
    cssmin = require('gulp-minify-css'),  //压缩css文件
    livereload = require('gulp-livereload'); //自动刷新页面

//js代码校验、合并和压缩（类似jquery的链式操作，牛）
gulp.task('scripts', function() {
    return gulp.src('src/Vue/js/*.js') //源文件
        .pipe(jshint.reporter('default'))
        .pipe(concat('Vue.js')) //2、合并js文件
        .pipe(gulp.dest('dist/Vue/js/')) //合并后文件存放位置
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify()) //3、执行压缩任务
        .pipe(gulp.dest('dist/Vue/js/')) //压缩后文件存放位置
        .pipe(notify({ //4、操作结束后提示
            message: 'Scripts task complete'
        }));
});

//css样式预编译、合并、压缩
gulp.task('css', function() {
    return gulp.src('src/Vue/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/Vue/css/'))
        .pipe(order([
            "src/Vue/css/common.css",
            "src/Vue/**/*.css"
        ]))
        .pipe(concat('Vue.css'))
        .pipe(gulp.dest('dist/Vue/css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssmin()) //压缩css
        .pipe(gulp.dest('dist/Vue/css/'))
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
    gulp.watch('src/Vue/js/*', ['scripts']);
    gulp.watch('src/Vue/less/*', ['css']);
    // Create LiveReload server（用来自动刷新浏览器）
    livereload.listen();
});