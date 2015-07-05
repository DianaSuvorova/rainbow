module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dev: {
        options: {
          debug: true,
        },
        files: [{
          expand: true,
          cwd: 'vis/',
          src: ['**/*.js'],
          dest: 'build/'
        }]
      },
      build: {
        options: {
          debug: false,
        },
        files: [{
          expand: true,
          cwd: 'vis/',
          src: ['**/*.js'],
          dest: 'build/'
        }]
      }
    },

    watch: {
      browserify: {
        files: ['vis/**/*.js', 'engine/*.js'],
        tasks: ['browserify:dev']
      },
      html: {
        files: ['vis/**/*.html'],
        tasks: ['copy:html']
      }
    },

    copy: {
      html: {
        expand: true,
        cwd: 'vis/',
        src: '**/*.html',
        dest: 'build/'
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true,
      },
      target: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.js'],
          dest: 'build/'
        }]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
 
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['browserify:dev', 'copy']);
  grunt.registerTask('build', ['browserify:build', 'uglify', 'copy']);

};