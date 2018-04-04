module.exports = (grunt) => {
    grunt.initConfig({
        execute: {
            target: {
                src:['login.html']
            }
        }, 
        watch: {
            scripts:{
                files: ['login.html'],
                tasks: ['execute'],
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');
};