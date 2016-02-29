var gulp = require("gulp");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var replace = require("gulp-replace-task");
var path = require("path");

gulp.task('css',function(){
	return gulp.src(['./src/css/build_default.less'])
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('js',function(){
	return gulp.src(['src/js/ui.js','src/js/ui-binginds.js','src/js/client.js','src/js/main.js','src/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('html',function(){
	return gulp.src(['src/*.html','src/manifest.json'])
		.pipe(replace({
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