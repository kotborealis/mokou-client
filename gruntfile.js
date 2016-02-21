module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            default: {
                options: {
                    sassDir: 'src/stylesheets',
                    cssDir: 'public/css',
                    specify: 'src/stylesheets/build_default.scss',
                    sourcemap: true,
                    outputStyle: "compressed"
                }
            }
        },

        jshint: {
            default: {
                src: 'src/javascripts/*',
            }
        },

        concat: {
            default: {
                src: ['src/javascripts/*.js'],
                dest: 'public/js/build.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                sourceMap: true,
                mangle: false,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'public/js/build.min.js': ['public/js/build.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
};