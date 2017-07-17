module.exports = grunt => {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		watch: {
			css: {
				files: ['src/css/*.scss'],
				tasks: ['newer:postcss'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			pug: {
				files: ['src/view/*.pug'],
				tasks: ['pug'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		},
		postcss: {
			options: {
				map: {
					inline: false,
					dist: 'dist/css/map/'
				},
				parser: require('postcss-scss'),
				processors: [
					require('precss')(),
					require('postcss-cssnext')({
						warnForDuplicates: false
					}),
					require('cssnano')(),
					require('lost')(),
					require('postcss-strip-inline-comments')()
				],
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: ['*.scss'],
					dest: 'dist/css',
					ext: '.css',
				}],
			}
		},
		pug: {
			compile: {
				files: [{
					expand: true,
					cwd: 'src/view',
					src: ['*.pug'],
					dest: 'dist/',
					ext: '.html',
				}],
			}
		},
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['pug', 'postcss']);
};
