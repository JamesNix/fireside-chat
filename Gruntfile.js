'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ---------------------------------------------------------------------- //
    watch: {
      jshint: {
        files: ['app/js/source/**/*.js', 'Gruntfile.js'],
        tasks: ['jshint:all', 'copy:jssource']
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade:build']
      },
      less: {
        files: ['app/css/**/*.less'],
        tasks: ['less:build']
      },
      copyjs: {
        files: ['app/js/vendor/**/*.js'],
        tasks: ['copy:jsvendor']
      },
      copycss: {
        files: ['app/css/**/*.css'],
        tasks: ['copy:css']
      },
      copymedia: {
        files: ['app/media/**/*'],
        tasks: ['copy:media']
      }
    },
    // ---------------------------------------------------------------------- //
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/js/source/**/*.js'
      ]
    },
    // ---------------------------------------------------------------------- //
    copy: {
      jssource: {
        cwd: 'app/js/source',
        src: ['**/*.js'],
        dest: 'public/js/source',
        expand: true
      },
      jsvendor: {
        cwd: 'app/js/vendor',
        src: ['**/*.js'],
        dest: 'public/js/vendor',
        expand: true
      },
      css: {
        cwd: 'app/css',
        src: ['**/*.css'],
        dest: 'public/css',
        expand: true
      },
      media: {
        cwd: 'app/media',
        src: ['**/*'],
        dest: 'public/media',
        expand: true
      }
    },
    // ---------------------------------------------------------------------- //
    jade: {
      build: {
        files: [{
          cwd: 'app',
          src: '**/*.jade',
          dest: 'public',
          ext: '.html',
          expand: true
        }]
      }
    },
    // ---------------------------------------------------------------------- //
    less: {
      build: {
        files: [{
          cwd: 'app/css',
          src: '**/*.less',
          dest: 'public/css',
          ext: '.css',
          expand: true
        }]
      }
    },
    // ---------------------------------------------------------------------- //
    clean: {
      server: 'public'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean', 'jshint:all', 'copy:jssource', 'jade:build', 'less:build','copy:jsvendor', 'copy:css', 'copy:media']);
  grunt.registerTask('default', ['build', 'watch']);
};

