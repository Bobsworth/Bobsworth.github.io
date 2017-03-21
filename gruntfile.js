module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/sass/',
                    src: ['*.scss'],
                    dest: 'docs/assets/css/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        watch: {
            files: ['source/sass/*.scss'],
            tasks: ['sass']
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'watch']);

};