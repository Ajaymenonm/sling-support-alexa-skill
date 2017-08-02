const gulp = require('gulp');
const zip = require('gulp-zip');
const gulpSequence = require('gulp-sequence');
const fs = require('fs');

const slingdevskillconfig = {
  api_scheme: 'https',
  api_host: process.env.api_host,
  guid: process.env.guid,
  sling_env_name: 'sling_dev',
  alexa_app_name: 'sling-support'
};

const skillconfig = slingdevskillconfig;

var paths = {
  javascript: ['index.js', 'lib/*.js'],
  config: 'slingskillconfig.json',
  node_modules: 'node_modules/**'
};

gulp.task('deploy', function(cb) {
  gulpSequence(['createconfig', 'zip'], cb);
});

gulp.task('createconfig', function(cb) {
  fs.writeFile('slingskillconfig.json', JSON.stringify(skillconfig), cb);
});

gulp.task('zip', () =>
  gulp.src(paths.javascript.concat(paths.node_modules).concat(paths.config), {
    base: '.'
  })
  .pipe(zip(skillconfig.sling_env_name + '.zip'))
  .pipe(gulp.dest('dist'))
);