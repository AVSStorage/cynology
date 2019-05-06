"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      dest: {
        options: {
          style: 'expanded',
          sourceMap: true
        },
        files: {
          "build/css/style.css": "source/scss/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            ["build/*.html", "build/css/*.css"]
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["copy"]
      },
      style: {
        files: ["source/scss/**/*.scss", "source/scss/*.scss"],
        tasks: ["sass", "csso"]
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 6,
          progressive: true,
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 50
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg}"]
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{eot,svg,ttf,woff,woff2}",
            "img/**",
            "*.html",
            "js/**"
          ],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
    "cwebp",
    "imagemin"
  ]);

};
