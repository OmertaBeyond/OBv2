/* jshint node: true */

module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jscs: {
			src: 'ob.user.js',
			options: {
				config: '.jscsrc'
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'ob.user.js'
			],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		csslint: {
			src: [
				'scripts/beyond.css'
			],
			options: {
				'box-model': false,     // true: Using width with padding can sometimes make elements larger than you expect.
				'gradients': false,     // true: Missing vendor-prefixed CSS gradients for Old Webkit (Safari 4+, Chrome).
				'ids':       false,     // true: Don't use IDs in selectors. Selectors should not contain IDs.
				'important': false      // true: Use of !important. Be careful when using !important declaration.
			}
		},
		lintspaces: {
			src: [
				'Gruntfile.js',
				'.jshintrc',
				'.travis.yml',
				'package.json',
				'scripts/beyond.css',
				'ob.user.js'
			],
			options: {
				editorconfig: '.editorconfig',
				ignores: ['js-comments']
			}
		}
	});

	// Load any grunt plugins found in package.json.
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
	require('time-grunt')(grunt);

	grunt.registerTask('default', [
		'jscs',
		'jshint',
		'csslint',
		'lintspaces'
	]);
};
