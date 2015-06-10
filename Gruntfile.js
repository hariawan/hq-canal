module.exports = function(grunt) {

  /* Dynamically load npm tasks */
  require("load-grunt-tasks")(grunt, {
    scope: "devDependencies"
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: "./bin/www"
      }
    },
    watch: {
      all: {
        files: [
          "Gruntfile.js",
          "public/javascripts/**/*",
          "public/stylesheets/**/*.styl"
        ],
        tasks: [
          "stylus",
          "autoprefixer",
          "cssmin",
          "concat",
          "uglify",
          "clean"
        ],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'public/stylesheets/main.css': [
            'public/stylesheets/plugins/normalize.css',
            'public/stylesheets/app/general.styl',
            'public/stylesheets/app/index.styl',
          ]
        },
      },
    },
    autoprefixer: {
      target: {
        files: {
          'public/stylesheets/main.css': 'public/stylesheets/main.css'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/stylesheets/main.min.css': 'public/stylesheets/main.css'
        }
      }
    },
    concat: {
      mainJS: {
        options: {
          separator: ";"
        },
        src: [
          "public/javascripts/plugins/jquery-1.11.3.min.js",
          "public/javascripts/app/general.js",
          "public/javascripts/app/index.js"
        ],
        dest: "public/javascripts/index-<%= pkg.version %>.js"
      }
    },
    uglify: {
      options: {
        ASCIIOnly: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      main: {
        src: 'public/javascripts/index-<%= pkg.version %>.js',
        dest: 'public/javascripts/index.min.js'
      }
    },
    clean: {
      js: [
        "public/javascripts/index-<%= pkg.version %>.js"
      ]
    },
    concurrent: {
      dev: [
        'nodemon',
        'watch'
      ],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.registerTask("default", [
    "concurrent:dev"
  ]);
};