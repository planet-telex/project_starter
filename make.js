var exec = require('child_process').exec;
var fs = require('fs');
//var folder = process.argv[2];

//exec('npm install jquery gsap backbone --save', function(err, stdout, stderr) {

//});

exec('mkdir css js assets');
exec('mkdir assets/img assets/fonts js/build js/build/router js/build/router/pages css/build css/build/pages');
exec('touch .env .gitignore package.json gulpfile.js index.js index.html css/style.css css/build/global.css css/build/pages/samplepage.css js/bundle.js js/router/pages/index.js');

var gulpfile = 'gulpfile.js';

gulpFileText = `
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('css', function() {
  return gulp.src(['./css/build/**/*.css'])
  .pipe(plumber())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(['./css/build/**/*.css'], ['css']);
});
`;


fs.writeFile(gulpfile, gulpFileText, function(err) {
  if(err) {
  	console.log('error writing gulpfile');
  }
});

var pjText = `
{
  "name": "avenir",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch": "watchify index.js -o js/bundle.js -v"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "backbone": "^1.3.3",
    "gsap": "^1.19.1",
    "jquery": "^3.1.1"
  },
  "devDependencies": {
    "browserify": "^13.3.0",
    "gulp": "^3.9.1",
    "gulp-clean-css": "^2.3.2",
    "gulp-concat": "^2.6.1",
    "gulp-plumber": "^1.1.0",
    "watchify": "^3.8.0"
  }
}
`;

fs.writeFile('package.json', pjText, function(err){
  if(err)
    console.error(err);
});



var gitignoreTxt = `*.DS_Store
package.json
gulpfile.js
node_modules/
public/assets/
public/js/vendor/`;

fs.writeFile('.gitignore', gitignoreTxt, function(err){
  if(err)
    console.error(err);
});
