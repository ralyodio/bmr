module.exports = function(grunt) {
    //TODO: move ./app/node-webkit.app out of the directory before building
    //TODO: create a ./src directory for building from.
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        release_name: 'Bmr-v0.0.1-alpha',
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/**/*.js']
        },
        nodewebkit: {
            options: {
                version: '0.7.5',
                build_dir: './build', // Where the build version of my node-webkit app is saved
                mac: true,
                win: true,
                linux32: true,
                linux64: true
            },
            src: ['./app/**/*']
        },

        // make a zipfile
        compress: {
            mac: {
                mode: 'zip',
                options: {
                    archive: 'dist/<%= release_name %>-mac.zip'
                },
                files: [
                    { expand: true, cwd: 'build/releases/bmr/mac/', src: ['**/*'], dest: '<%= release_name %>-mac' },
                ]
            },

            linux32: {
                mode: 'tgz',
                options: {
                    archive: 'dist/<%= release_name %>-linux32.tgz'
                },
                files: [
                    { expand: true, cwd: 'build/releases/bmr/linux32/', src: ['**/*'], dest: '<%= release_name %>-linux32' },
                ]
            },

            linux64: {
                mode: 'tgz',
                options: {
                    archive: 'dist/<%= release_name %>-linux64.tgz'
                },
                files: [
                    { expand: true, cwd: 'build/releases/bmr/linux64/', src: ['**/*'], dest: '<%= release_name %>-linux64' },
                ]
            },

            win: {
                mode: 'zip',
                options: {
                    archive: 'dist/<%= release_name %>-win.zip'
                },
                files: [
                    { expand: true, cwd: 'build/releases/bmr/win/', src: ['**/*'], dest: '<%= release_name %>-win' },
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['nodewebkit', 'compress:mac', 'compress:linux32', 'compress:linux64', 'compress:win']);

};