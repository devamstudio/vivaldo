'use strict';

//dependencies for build
const gulp = require('gulp');
const sassToCss = require('gulp-sass');
const sassGlobbing = require('gulp-sass-glob');
const pug = require('gulp-pug');
const pugPlumber = require('gulp-plumber');
const pugConcat = require('gulp-concat');
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
			.pipe( gulp.dest( build.dist ) );
	}
	return cb();
}

function markup(cb) {
	buildData = require('./src/build.json');
	for (let build of buildData.builds) {
		console.log('markup for: ' + build.title);
		let data = require(build.src.data);
		console.log('data: ' + data);
		gulp
			.src( build.src.markup )
			.pipe( pugPlumber() )
			.pipe(pug({
				locals: data,
				pretty: true
			}))
			.pipe( gulp.dest( build.dist ) );
	}
	return cb();
}

function images(cb) {
//	gulp
//		.src(test+'pug/**/*.pug')
//		.pipe( plumber() )
//		.pipe( pug( { pretty: true } ) )
//		.pipe( gulp.dest(  ) );
	return cb();
}
//build project END

function watch() {
	gulp.watch(['src/**/*.sass', 'src/**/*.json'], style);
	gulp.watch(['src/**/*.pug', 'src/**/*.json'], markup);
}

exports.style = style
exports.markup = markup
exports.images = images
exports.watch = watch

const build = gulp.series(gulp.parallel(images, style, markup));
const workon = gulp.series(build, watch);

exports.build = build
exports.default = workon