/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;

	// Project configuration
	grunt.initConfig({
		//pkg: grunt.file.readJSON('package.json'),

        sass: {
			main: {
				files: {
					'css/theme/default.css': 'css/theme/source/default.scss',
					'css/theme/theme-sfeir.css': 'css/theme/source/theme-sfeir.scss'
				}
			}
		},

		connect: {
            options: {
                hostname: 'localhost',
                base: '.'

            },
            livereload: {
                options: {
                    port: 9000,
                    open: true,
                    livereload: 35729
                }
            }
		},

		watch: {
			main: {
				files: [ 'index.html' ]
			},
			theme: {
				files: [
                    'css/theme/source/*.scss',
                    'css/theme/template/*.scss'
                ],
				tasks: 'themes'
			},
            livereload: {
                options: {
                    livereload: '<%= connect.livereload.options.livereload %>'
                },
                files: [
                    '<%= watch.main.files %>',
                    '<%= watch.theme.files %>'
                ]
            }
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Default task
	grunt.registerTask( 'default', [ 'cssmin', 'uglify' ] );

	// Theme task
	grunt.registerTask( 'themes', [ 'sass' ] );

	// Package presentation to archive
	grunt.registerTask( 'serve', [ 'themes', 'connect:livereload', 'watch' ] );

};
