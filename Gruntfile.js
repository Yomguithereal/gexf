module.exports = function(grunt) {

  var jsfiles = ['src/parser.js'];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    closureLint: {
      app:{
        closureLinterPath: '/usr/local/bin',
        src: jsfiles,
        command: 'gjslint',
        options: {
          stdout: true,
          strict: false,
          opt: '--disable 6,13'
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            './test/unit.html'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '/* Gexf Parser - <%= pkg.description %> - Version: <%= pkg.version %> - Author:  Guillaume Plique, Sciences-Po médialab - License: MIT */\n'
      },
      prod: {
        files: {
          'build/gexf-parser.min.js': jsfiles
        }
      }
    },
    jshint: {
      all: jsfiles,
      options: {
        '-W055': true,
        '-W040': true,
        '-W064': true
      }
    },
  });

  grunt.loadNpmTasks('grunt-closure-linter');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, will check lint, test and minify:
  grunt.registerTask('default', ['closureLint', 'jshint', 'qunit', 'uglify']);

  // Travis task
  grunt.registerTask('travis', ['qunit']);
};
