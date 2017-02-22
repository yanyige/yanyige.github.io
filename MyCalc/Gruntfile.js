
'use strict'

module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	}

	grunt.initConfig({

		config: config,

		sass: {
            dist: {
                files: {
                    '<%= config.app %>/style/style.css' : '<%= config.app %>/sass/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
	});

	grunt.registerTask('default',['watch']);
	
}