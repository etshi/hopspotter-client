import gulp from 'gulp'
import { fixtures as config } from '../config'

gulp.task('fixtures', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
})
