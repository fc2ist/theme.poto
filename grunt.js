module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-less');
  
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
      ,bootstrap: '/*!\n * Bootstrap v2.1.0\n *\n * Copyright 2012 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world @twitter by @mdo and @fat.\n */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<banner:meta.bootstrap>', 'css/theme.css'],
        dest: 'css/theme.css'
      },
      min: {
        src: ['<banner:meta.banner>', '<banner:meta.bootstrap>', 'css/theme.min.css'],
        dest: 'css/theme.min.css'
      }
    },
    less: {
      dist: {
        src: ['src/less/theme.less'],
        dest: 'css/theme.css'
      },
      min: {
        src: ['src/less/theme.less'],
        dest: 'css/theme.min.css',
        options: {
          yuicompress: true
        }
      }
    },
    watch: {
      files: ['package.json', 'src/less/*.less', 'src/less/bootstrap/*.less'],
      tasks: 'less concat'
    }
  });

  // Default task.
  grunt.registerTask('default', 'watch');

};