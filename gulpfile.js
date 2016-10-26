'use strict';
/**
 * Module Dependencies
 */
const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

/**
 * Utilities
 **/
function getScriptStr(script) {

    return "script(src='js/" + script + "')";

}

function getCSSStr(cssFileName) {

    return "link(rel='stylesheet', href='css/" + cssFileName + "')";

}

/**
 * Gulp Tasks
 **/

gulp.task('replace-signin', () => {

    gulp.src('./views_src/app/blocks/signin.pug')
        .pipe(replace(/\/{6}signin[\S\s]+\/{6}/m, getScriptStr('signin.js')))
        .pipe(gulp.dest('views/app/blocks/'));

});

gulp.task('replace-signup', () => {

    gulp.src('./views_src/app/blocks/signup.pug')
        .pipe(replace(/\/{6}signup[\S\s]+\/{6}/m, getScriptStr('signup.js')))
        .pipe(gulp.dest('views/app/blocks/'));

});


gulp.task('replace-eventchoice', () => {

    gulp.src('./views_src/app/blocks/eventchoice.pug')
        .pipe(replace(/\/{6}eventchoice[\S\s]+\/{6}/m, getScriptStr('eventchoice.js')))
        .pipe(gulp.dest('views/app/blocks/'));

});

gulp.task('replace-eventpersonal', () => {

    gulp.src('./views_src/app/blocks/eventpersonal.pug')
        .pipe(replace(/\/{6}eventpersonal[\S\s]+\/{6}/m, getScriptStr('eventpersonal.js')))
        .pipe(gulp.dest('views/app/blocks/'));

});


gulp.task('replace-eventsocial', () => {

    gulp.src('./views_src/app/blocks/eventsocial.pug')
        .pipe(replace(/\/{6}eventsocial[\S\s]+\/{6}/m, getScriptStr('eventsocial.js')))
        .pipe(replace(/\/{6}appheadsocial[\S\s]+\/{6}/m, getCSSStr('appheadsocial.css')))
        .pipe(gulp.dest('views/app/blocks/'));

});

gulp.task('replace-profile', () => {

    gulp.src('./views_src/app/blocks/profile.pug')
        .pipe(replace(/\/{6}profile[\S\s]+\/{6}/m, getScriptStr('profile.js')))
        .pipe(gulp.dest('views/app/blocks/'));

});

gulp.task('replace-landing', () => {

    gulp.src('./views_src/landing/scriptslanding.pug')
        .pipe(replace(/\/{6}landing[\S\s]+\/{6}/m, getScriptStr('landing.js')))
        .pipe(gulp.dest('views/landing/'));

});

gulp.task('replace-apphead', () => {

    gulp.src('./views_src/app/app_layout.pug')
        .pipe(replace(/\/{6}apphead[\S\s]+\/{6}/m, getCSSStr('apphead.css')))
        .pipe(gulp.dest('views/app/'));

});

gulp.task('replace-apphead', () => {

    gulp.src('./views_src/app/app_layout.pug')
        .pipe(replace(/\/{6}apphead[\S\s]+\/{6}/m, getCSSStr('apphead.css')))
        .pipe(gulp.dest('views/app/'));

});

gulp.task('replace-landing', () => {

    gulp.src('./views_src/landing/headlanding.pug')
        .pipe(replace(/\/{6}apphead[\S\s]+\/{6}/m, getCSSStr('apphead.css')))
        .pipe(gulp.dest('views/landing/'));

});

gulp.task('replace', ['replace-signin', 
                      'replace-signup', 
                      'replace-eventchoice', 
                      'replace-eventpersonal', 
                      'replace-eventsocial', 
                      'replace-profile', 
                      'replace-landing', 
                      'replace-apphead', 
                      'replace-landing']);

gulp.task('css-social', () => {
    
    gulp.src(['./public_src/bower_components/materialize/dist/css/materialize.css',
              './public_src/css/styles.css', 
              './public_src/bower_components/selectize/dist/css/selectize.css'])
        .pipe(autoprefixer())
        .pipe(concat('appheadsocial.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'))

});

gulp.task('css', ['css-social'], () => {
    
    gulp.src(['./public_src/bower_components/materialize/dist/css/materialize.css',
              './public_src/css/styles.css'])
        .pipe(autoprefixer())
        .pipe(concat('apphead.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'))

});

gulp.task('move-views', () => {

    gulp.src('./views_src/**/**/**')
        .pipe(gulp.dest('views/'))

});


gulp.task('move-img', () => {

    gulp.src('./public_src/img/**/**/**')
        .pipe(gulp.dest('public/img'))

});

gulp.task('movejs-localforage', () => {

    gulp.src('./public_src/bower_components/localforage/dist/localforage.min.js')
        .pipe(gulp.dest('./public/bower_components/localforage/dist'))

});

gulp.task('movejs-signin', () => {

    gulp.src(['./public_src/bower_components/localforage/dist/localforage.min.js',
              './public_src/js/redirect_loggedin.js',
              './public_src/bower_components/jquery/dist/jquery.min.js', 
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/js/navinit.js',
              './public_src/js/signin.js'])
              .pipe(concat('signin.js'))
              //.pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

gulp.task('movejs-signup', () => {

    gulp.src(['./public_src/bower_components/localforage/dist/localforage.min.js',
              './public_src/js/redirect_loggedin.js',
              './public_src/bower_components/jquery/dist/jquery.min.js', 
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/js/navinit.js',
              './public_src/js/signup.js'])
              .pipe(concat('signup.js'))
              //.pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

gulp.task('movejs-eventchoice', () => {

    gulp.src(['./public_src/js/addressreset.js',
              './public_src/bower_components/jquery/dist/jquery.min.js', 
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/bower_components/knockout/dist/knockout.js',
              './public_src/js/navinit.js'])
              .pipe(concat('eventchoice.js'))
              .pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

gulp.task('movejs-eventpersonal', () => {

    gulp.src(['./public_src/bower_components/jquery/dist/jquery.min.js',
              './public_src/bower_components/pickadate/lib/compressed/picker.js',
              './public_src/bower_components/pickadate/lib/compressed/picker.time.js',
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/bower_components/knockout/dist/knockout.js',
              './public_src/js/navinit.js',
              './public_src/js/eventmain.js',
              './public_src/js/eventpersonal.js',
              './public_src/js/getprofile.js'])
              .pipe(concat('eventpersonal.js'))
              .pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

gulp.task('movejs-eventsocial', () => {

    gulp.src(['./public_src/bower_components/jquery/dist/jquery.min.js',
              './public_src/bower_components/pickadate/lib/compressed/picker.js',
              './public_src/bower_components/pickadate/lib/compressed/picker.time.js',
              './public_src/bower_components/selectize/dist/js/standalone/selectize.js',
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/bower_components/knockout/dist/knockout.js',
              './public_src/js/navinit.js',
              './public_src/js/eventmain.js',
              './public_src/js/eventsocial.js',
              './public_src/js/selectize.js',
              './public_src/js/getprofile.js'])
              .pipe(concat('eventsocial.js'))
              .pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

/*gulp.task('movejs-eventsocial-2', ['movejs-eventsocial'], () => {*/

    //gulp.src(['./public_src/bower_components/selectize/dist/js/selectize.js',
              //'./public_src/js/selectize.js'])
        //.pipe(concat('selectize.js'))
        //.pipe(gulp.dest('public/js'))

//});

//gulp.task('movejs-eventsocial-final', ['movejs-eventsocial-2'], () => {

    //gulp.src(['./public/js/eventsocial_wo_selectize.js',
              //'./public/js/selectize.js'])
        //.pipe(concat('eventsocial.js'))
        //.pipe(gulp.dest('public/js'))

/*});*/

gulp.task('movejs-profile', () => {

    gulp.src(['./public_src/bower_components/jquery/dist/jquery.min.js',
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/bower_components/knockout/dist/knockout.js',
              './public_src/js/navinit.js',
              './public_src/js/getprofile.js',
              './public_src/js/getevent.js',
              './public_src/js/savebio.js'])
              .pipe(concat('profile.js'))
              .pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

gulp.task('movejs-landing', () => {

    gulp.src(['./public_src/bower_components/localforage/dist/localforage.min.js',
              './public_src/js/redirect_loggedin.js',
              './public_src/bower_components/jquery/dist/jquery.min.js',
              './public_src/bower_components/materialize/dist/js/materialize.min.js',
              './public_src/js/landing.js'])
              .pipe(concat('landing.js'))
              //.pipe(jsmin())
              .pipe(gulp.dest('public/js'))

});

gulp.task('movejs', ['movejs-localforage', 'movejs-signup', 'movejs-signin', 'movejs-eventchoice', 'movejs-eventsocial', 'movejs-eventpersonal', 'movejs-profile', 'movejs-landing'])

gulp.task('default', ['movejs', 'replace', 'css'])
