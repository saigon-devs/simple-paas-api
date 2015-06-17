var dest = './www';
var src = './app';
var pub = './public';
var gutil = require('gulp-util');

module.exports = {
    server: {
        settings: {
            root: dest,
            host: 'localhost',
            port: 8080,
            livereload: {
                port: 35929
            }
        }
    },
    sass: {
        src: pub + '/components/**/*.{sass,scss,css}',
        dest: dest + '/styles',
        settings: {
            indentedSyntax: false, // Enable .sass syntax?
            imagePath: '/images' // Used by the image-url helper
        }
    },
    browserify: {
        settings: {
            transform: ['babelify', 'reactify']
        },
        src: pub + '/index.jsx',
        pub: pub + '/index.jsx',
        dest: dest + '/js',
        outputName: 'index.js',
        /*src: './server.js',
         pub: './server.js',
         dest: './',
         outputName: 'server-es6.js',*/
        debug: gutil.env.type === 'dev'
    },
    bower: {
        src: './bower_components',
        dest: dest + '/js'
    },
    watch: {
        src: 'app/**/*.*',
        tasks: ['build']
    },
    clean: {
        style: dest + '/styles/',
        js: dest + '/js/'
    }
};
