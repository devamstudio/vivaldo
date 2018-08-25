'use strict';

//dependencies for build
const gulp = require('gulp');
const sass = require('gulp-sass');
const sass_globbing = require('gulp-sass-glob');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const flatten = require('gulp-flatten');
const concat = require('gulp-concat');

const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const gulpifelse = require('gulp-if-else');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const rename = require('gulp-rename');
//dependencies for build END

//settings
var target = '';
if( argv.project === 'player' ){
	target = 'dist/player/'
} else if ( argv.project === 'artist' ){
	target = 'dist/artist/'
}
var source = {
	style  : 'source/_assets/style/',
	script : 'source/_assets/js/',
	images : 'source/_assets/images/' + argv.project + '/',
	pug	   : 'source/' + argv.project + '/',
}
var dist = {
	style  : target + 'assets/css/',
	script : target + 'assets/js/',
	images : target + 'assets/images/',
	fonts  : target + 'assets/fonts/',
	html   : target
}
gulp.task('sass', function () {
	gulp.src( source.style + argv.project + '.sass' )
		.pipe( sass() )
		.pipe( sass_globbing() )
		.pipe( rename({
			basename: 'style',
			extname: '.css'
		}) )
		.pipe( gulp.dest(dist.style) )
		//.pipe( sass({ outputStyle: 'compressed' }) )
		//.pipe( sass_globbing() )
		//.pipe( rename({
		//	basename: 'style.min',
		//	extname: '.css'
		//}) )
		//.pipe( gulp.dest(dist.style) )
});
gulp.task('imagemin', function () {
	gulp.src( source.images+'*' )
		.pipe( imagemin([
			imagemin.gifsicle( { interlaced: true } ),
			imagemin.jpegtran( { progressive: true } ),
			imagemin.optipng( { optimizationLevel: 5 } ),
			imagemin.svgo( { plugins: [{removeViewBox: true}] } )
		], {verbose: true}))
		.pipe(flatten())
		.pipe( gulp.dest( dist.images ) )
});
gulp.task('pug', function buildHTML() {
	gulp.src(source.pug + '*.pug')
		.pipe( plumber() )
		.pipe( gulpifelse( !argv.build, function(){ return pug() }, function(){ return pug({ pretty: true })} ) )
		.pipe( gulp.dest( dist.html ) )
});
gulp.task('scripts', function() {
	return gulp.src(source.script + '*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest(dist.script))
});
gulp.task('rage', function(){
	// copy fonts
	gulp.src('source/_modules/icons-rage/dist/fonts/*')
		.pipe(flatten())
		.pipe( gulp.dest( dist.fonts ) )
	// copy css
	gulp.src('source/_modules/icons-rage/dist/css/*.css')
		.pipe(flatten())
		.pipe( gulp.dest( dist.style ) )
})
//build project END
gulp.task('default', ['watch','connect']);
gulp.task('connect', function() {
	connect.server({
		livereload: true
	});
});
//watchers
gulp.task('watch', function(){
	gulp.watch( source.style+'**/*.sass', ['sass'] );
	gulp.watch( source.images+'*', ['imagemin'] );
	gulp.watch( 'source/**/*.pug', ['pug'] );
	gulp.watch( 'source/**/*.js', ['scripts'] );
})
//watchers END