module.exports = function(grunt) {
  var fs = require('fs');

  grunt.initConfig({
    watch: {
      js_css_html: {
        files: ['src/*'],
        tasks: ['exec'],
        options: {
          livereload: true
        }
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    },
    exec: {
      onlineBuild: {
        command: './build.sh'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['watch']);
};
