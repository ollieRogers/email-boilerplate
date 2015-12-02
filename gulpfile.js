var gulp         =  require('gulp');
var emailBuilder =  require('gulp-email-builder');
var browserSync  =  require('browser-sync').create();
var data         =  require('gulp-data');
var path         =  require('path');
var fs           =  require('fs');


// use gulp-email-builder to inline css
gulp.task('emailBuilder', function() {
    return gulp.src(['./src/html/*.html'])
        .pipe(emailBuilder())
        .pipe(gulp.dest('./dist/emails'));
});


// push the names of all emailfiles to the files array
var files = []
gulp.task('getIndexFiles', function(){
    return gulp.src(['./src/html/*.html'])
        .pipe(data(function(file) {
             files.push( path.basename(file.path) )
        }))
});


// set up an index file with links to all the available emails
gulp.task('writeIndex', ['getIndexFiles'], function(){
    var links = '';
    var html  = '';
    var i;

    for( i=0;i<files.length;i++) {
        links += '<li><a href="/' + files[i] +'">' + files[i] + '</a></li>';
    };

    html =  '<!DOCTYPE html>'
            + '<html lang="en">'
            + '<head>'
            + '<meta charset="UTF-8">'
            + '<title>Emails</title>'
            + '</head>'
            + '<body>'
            + '<ul>'
            + links
            + '</ul>'
            + '</body>'
            + '</html>';

    fs.writeFileSync('dist/emails/index.html', html);

});

// Static server
gulp.task('serve', ['emailBuilder', 'writeIndex'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist/emails/"
        }
    });

    gulp.watch("./src/html/**/*.html").on('change', browserSync.reload);
    gulp.watch("./src/css/**/*.css").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
