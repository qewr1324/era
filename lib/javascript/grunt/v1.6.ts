export function generate(params: any): string {
	return `module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      build: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/app.min.js'
      }
    },
    
    sass: {
      dist: {
        files: {
          'dist/css/style.css': 'src/scss/main.scss'
        }
      }
    },
    
    cssmin: {
      target: {
        files: {
          'dist/css/style.min.css': ['dist/css/style.css']
        }
      }
    },
    
    watch: {
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify']
      },
      styles: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['uglify', 'sass', 'cssmin']);
};`;
}
