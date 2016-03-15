var gulp = require("gulp");
var _ = require('gulp-load-plugins')();
var path = require("path");

gulp.task('css',function(){
	return gulp.src(['./src/css/build_default.less'])
		.pipe(_.sourcemaps.init())
		.pipe(_.less())
		.pipe(_.sourcemaps.write("./"))
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('js',function(){
	return gulp.src(['src/js/main.js',
				'src/js/client/client.js', 'src/js/client/act.js', 'src/js/client/handle.js',
				'src/js/ui/ui.js', 'src/js/ui/template.js', 'src/js/ui/chat.js', 'src/js/ui/userlist.js', 'src/js/ui/act.js', 'src/js/ui/event.js',
				'src/js/util.js'])
        .pipe(_.sourcemaps.init())
		/*.pipe(_.babel({
            presets: ['es2015']
		 }))*/
        .pipe(_.concat('build.js'))
        .pipe(_.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('html',function(){
	return gulp.src(['src/*.html','src/manifest.json'])
		.pipe(_.replaceTask({
			patterns: [
	            {
	                match: 'timestamp',
	                replacement: new Date().getTime()
	            },
	            {
	                json: {
	                    "theme": {
	                        "color": "#4F0000",
	                        "bgcolor": "#4F0000"
	                    },
	                    "app": {
	                    	"name": "Mokou"
	                    }
	                }
	            }
	        ]
		}))
		.pipe(gulp.dest('./public/'));
});