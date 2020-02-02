'use strict';

//dependencies for build
const gulp = require('gulp');
const sassToCss = require('gulp-sass');
const sassGlobbing = require('gulp-sass-glob');
const pug = require('gulp-pug');
const pugPlumber = require('gulp-plumber');
const pugConcat = require('gulp-concat');
const connect = require('gulp-connect');
//dependencies for build END

//config INIT
var buildData = require('./src/build.json');
//config END


function style(cb) {
    buildData = require('./src/build.json');
    for (let build of buildData.builds) {
        console.log('style for: ' + build.title);
        gulp
            .src( build.src.styles )
            .pipe( pugPlumber() )
            .pipe( sassGlobbing() )
            .pipe( pugConcat('style.sass'))
            .pipe( sassToCss().on( 'error', sassToCss.logError ) )
            .pipe( gulp.dest( build.dist ) )
            .pipe( connect.reload() );
    }
    return cb();
}

function markup(cb) {
    buildData = require('./src/build.json');
    for (let build of buildData.builds) {
        if (!build.src.markup){
            break;
        }
        console.log('markup for: ' + build.title);
        let data = require(build.src.data);
        gulp
            .src( build.src.markup )
            .pipe( pugPlumber() )
            .pipe(pug({
                locals: data,
                pretty: true
            }))
            .pipe( gulp.dest( build.dist ) )
            .pipe( connect.reload() );
    }
    return cb();
}

function images(cb) {
    buildData = require('./src/build.json');
    for (let build of buildData.builds) {
        if (!build.src.images){
            break;
        }
        if( build.src.images ) {
            gulp
                .src( build.src.images )
                .pipe( gulp.dest( build.dist + '/images/' ) );
        }
    }
    return cb();
}

function scripts(cb) {
    buildData = require('./src/build.json');
    for (let build of buildData.builds) {
        if( build.src.scripts ) {
            gulp
                .src( build.src.scripts )
                .pipe( gulp.dest( build.dist + '/scripts/saparated/' ) );
            
            gulp
                .src( build.src.scripts )
                .pipe( pugConcat('build.js'))
                .pipe( gulp.dest( build.dist + '/scripts/' ) );
        }
    }
    return cb();
}
//build project END

//local server
function server() {
    connect.server({
        root: 'dist',
        port: 8080,
        livereload: true
    });
};
//local server END

function watch() {
    gulp.watch(['src/**/*.sass', 'src/**/*.json'], style);
    gulp.watch(['src/**/*.js', 'src/**/*.json'], scripts);
    gulp.watch(['src/**/*.pug', 'src/**/*.json'], markup);
}

exports.style = style
exports.markup = markup
exports.images = images
exports.scripts = scripts
exports.watch = watch
exports.server = server

const build = gulp.series(gulp.parallel(images, style, scripts, markup));
const workon = gulp.series(build, gulp.parallel(watch, server));

exports.build = build
exports.default = workon