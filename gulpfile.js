var gulp = require('gulp');
var XTemplate = require('xtemplate');
var gulpXTemplate = require('gulp-xtemplate');

var src = './templates';

gulp.task('xtpl', function() {
	return gulp.src(src + '/**/*.xtpl')
		.pipe(gulpXTemplate({
			wrap: 'kissy',
			XTemplate: XTemplate
		}))
		.on('error', function(e) {
			console.log(e);
		})
		.pipe(gulp.dest(src));
});