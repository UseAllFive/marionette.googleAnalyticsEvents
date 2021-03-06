var config;
var matchdep = require('matchdep');
var module;

config = {
    files: {
        build: 'lib/marionette.googleAnalyticsEvents.js',
        check: [
            'lib/marionette.googleAnalyticsEvents.js',
            'Gruntfie.js'
        ],
        dest: 'dist/marionette.googleAnalyticsEvents.min.js',
        docs: 'docs'
    }
};

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');
    var defaultTasks;

    grunt.initConfig({
        pkg: pkg,

        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                files: {
                    src: config.files.check
                }
            }
        },

        jscs: {
            all: {
                files: {
                    src: config.files.check
                }
            }
        },

        groc: {
            options: {
                out: config.files.docs,
                strip: 'lib/'
            },
            all: {
                src: config.files.build
            },
            github: {
                options: {
                    github: true
                },
                src: config.files.build
            }
        },

        uglify: {
            all: {
                src: config.files.build,
                dest: config.files.dest
            }
        },

        watch: {
            options: {
                interrupt: true
            },
            js: {
                files: config.files.check,
                tasks: ['uglify', 'groc:all']
            }
        }
    });

    // Load all npm dependencies.
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Register tasks.
    defaultTasks = [
        'jshint',
        'jscs',
        'groc:all',
        'uglify'
    ];
    grunt.registerTask('default', defaultTasks);
    grunt.registerTask('dev', defaultTasks.concat('watch'));
};
