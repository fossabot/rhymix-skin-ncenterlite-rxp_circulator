var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

var taskSass = function () {
  return gulp.src('./scss/*.scss')
    .pipe($.plumber())
    .pipe($.sass({ outputStyle: 'expanded' }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('.'))
}
taskSass.displayName = 'sass'

var taskLintStyle = function () {
  return gulp.src(['./scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
}
taskLintStyle.displayName = 'lint:style'

var taskFixStyle = function () {
  return gulp.src(['./scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.stylelint({
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(gulp.dest('./scss'))
}
taskFixStyle.displayName = 'lint:fix-style'
taskFixStyle.description = '.scss 자동 교정'

var taskWatch = function () {
  gulp.watch(['./scss/**/*.scss'], gulp.series(taskLintStyle, taskSass))
}

var taskBuild = gulp.series(taskLintStyle, taskSass)
taskBuild.displayName = 'build'

var taskDefault = gulp.series(taskLintStyle, taskSass)
gulp.task('default', taskDefault)
gulp.task(taskSass)
gulp.task(taskLintStyle)
gulp.task(taskFixStyle)
gulp.task('watch', taskWatch)
