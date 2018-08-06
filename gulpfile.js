var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var postcssVars = require('postcss-simple-vars');

webpack = require('webpack');

gulp.task('watch', function() {
    watch(["style.css", "themes/**/"], function() {
        gulp.start('styles');
    });
});

gulp.task('styles', function() {
    return gulp.src("style.css")
        .pipe(postcss([postcssImport, postcssNested, postcssVars]))
        .on('error', function(err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest("build/"));
});

gulp.task('webpack', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});