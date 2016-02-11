var config = {
  src : 'www',
  node: 'node_modules'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    copy: {
      init: {
      files: [{
          expand: true,
          cwd: '<%= config.node %>/angular',
          src: ['angular.min.js'],
          dest: '<%= config.src %>/libs'
      },{
          expand: true,
          cwd: '<%= config.node %>/angular-route',
          src: ['angular-route.min.js'],
          dest: '<%= config.src %>/libs'
      },
      {
          expand: true,
          cwd: '<%= config.node %>/bootstrap/dist/css',
          src: ['bootstrap.min.css'],
          dest: '<%= config.src %>/css'
      }
       ]        
      } 
    }, 
    uglify: {
    	js_files : {
	    	files: {
	        	'<%= config.src %>/js/script.min.js' : ['<%= config.src %>/js/script.js']
	      	}    		
	    }
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', ['uglify']);
  grunt.registerTask('init', ['copy:init']);

  grunt.registerTask('default', ['init', 'dist']);
};