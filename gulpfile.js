var gulp         =  require('gulp');
var emailBuilder = require('gulp-email-builder');

gulp.task('emailBuilder', function() {
    return gulp.src(['./src/html/*.html'])
        .pipe(emailBuilder())
        .pipe(gulp.dest('./dist/emails'));
});


gulp.task('default', ['emailBuilder']);
