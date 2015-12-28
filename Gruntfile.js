'use strict';

var assetsBower = require('./config/assetsBower.js');

var paths = {
	jsPublic:[
	'packages/**/public/**/*.js'
	],
	js: [
	'*.js',
	'!bower_components/**',
	'!node_modules/**',
	'packages/**/*.js',
	'utils/**/*.js',
	'!utils/**/lib/**/*.js',
	'config/**/*.js'
	],
	html: [
	'!bower_components/**',
	'!node_modules/**',
	'packages/**/public/**/*.html',
	'packages/**/server/**/*.html',
	'views/**/*.html'
	],
	css: [
	'!bower_components/**',
	'!node_modules/**',
	'packages/**/*.css',
	'packages/**/*.less'
	],
	jpg: [
	'!bower_components/**',
	'!node_modules/**',
	'packages/**/*.jpg'
	]
};

paths.jsAll=assetsBower.js.concat(['production/templates.js']);
paths.jsAll=paths.jsAll.concat(paths.jsPublic);
//paths.cssAll=assetsBower.css.concat(['packages/**/*.css','packages/**/*.less']);
paths.cssAll=['packages/system/public/assets/css/global.less'];

module.exports = function(grunt) {
// Project Configuration
grunt.initConfig({
	env : {
		agronet : {
			AGRONET_ENV : process.argv[2]==='production'?'production':'dev'
		}
	},
	watch: {
		js: {
			files: paths.js,
			tasks: ['jshint'],
			options: {
				livereload: true
			}
		},
		html: {
			files: paths.html,
			options: {
				livereload: true,
				interval: 500
			}
		},
		css: {
			files: paths.css,
			tasks: ['less','concat'],
			options: {
				livereload: true
			}
		}
	},
	jshint: {
		all: {
			src: paths.js,
			options: {
				jshintrc: true
			}
		}
	},
	html2js: {
		options: {
			base: 'packages'
		},
		main: {
			src: ['packages/**/public/**/*.html'],
			dest: 'production/templates.js'
		},
	},
	uglify: {
		agronet_min: {
			files: {
				'production/aggregated.js': paths.jsAll
			}
		}
	},
	less:{
		development:{
			files: [{
			  expand: true,
			  src: paths.cssAll,
			  dest: 'production/less/',
			  ext: '.css'
			}]
		}
	},
	concat: {
		dist: {
			src: 'production/less/**/*.css',
			dest: 'production/non-aggregated.css'
		}
	},
	cssmin: {
		target: {
			files: {
				'production/aggregated.css':  ['production/non-aggregated.css']
			}
		}
	},
	nodemon: {
		dev: {
			script: 'server.js',
			options: {
				args: [],
				ignore: ['node_modules/**'],
				ext: 'js,html',
				delayTime: 1,
				cwd: __dirname
			}
		}
	},
	concurrent: {
		tasks: ['nodemon', 'watch'],
		options: {
			logConcurrentOutput: true
		}
	}
});

require('load-grunt-tasks')(grunt);

grunt.registerTask('default', ['env','jshint','less','concat','concurrent']);
grunt.registerTask('production', ['env','html2js','uglify','less','concat','cssmin','nodemon']);
grunt.registerTask('build', ['html2js','uglify','less','concat','cssmin']);

};
