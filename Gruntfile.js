module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   concat: {
    options: {
      separator: ';',
    },
    js: {
      src: ['public/client/**/*.js',
          'public/lib/**/*.js'],
      dest: 'public/dist/js/built.js',
    },
    css: {
      src: ['public/*.css'],
      dest: 'public/dist/css/built.css',
    }
  },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      js: {
        files:{
        'public/dist/output.min.js': ['public/dist/js/built.js']
        }
      }  
    },

    eslint: {
      all: ["public/dist/output.min.js" , "public/dist/output.min.css"
        
      ]
    },

    cssmin: {
      css: {
        files:{
        'public/dist/output.min.css': ['public/dist/css/built.css']
        }
      }  
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
     gitadd: {
    task: {
      options: {
        all: true
      }
    }
  },
   gitcommit: {
        task: {
            options: {
                message: 'Testing',
                noVerify: true,
                noStatus: false
            }
        }
    },
     gitpush: {
    your_target: {
      options: {
        // Target-specific options go here.
        branch: 'heroku'
      }
    }
  }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [ 'concat' , 'uglify', 'cssmin','eslint'
    , 'mochaTest'
  ]);

  grunt.registerTask('default', ['build', 'watch', 'nodemon'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['gitadd' , 'gitcommit', 'gitpush'])

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [ 'build' , 'upload'
    // add your deploy tasks here
  ]);


};
