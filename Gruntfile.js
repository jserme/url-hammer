module.exports = function(grunt) {
  var fs = require('fs');

  grunt.initConfig({
    watch: {
      js_css_html: {
        files: ['*.html', '**/*.js', '**/*.jsx', '**/*.css'],
        options: {
          livereload: true
        }
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
