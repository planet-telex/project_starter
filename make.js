var exec = require('child_process').exec;
var fs = require('fs');
var folderName = process.argv[2];

var config = {
  dest: '~/Sites/'+folderName,

};




fs.exists('./'+folderName, function(exists){
    if(exists){
      console.log('this directory already exists...exiting');

    } else {


      function addFolderNameToPaths(path) {
        return path.replace(/ /g, ' '+folderName+'/');
      }

      //exec('npm install jquery gsap backbone --save', function(err, stdout, stderr) {

      //});
      var makeDirsTop = 'mkdir css js assets';
      var makeDirsInner = 'mkdir assets/img assets/fonts js/build js/build/router js/build/router/pages css/build css/build/pages';
      var makeFiles = 'touch .env .gitignore package.json gulpfile.js index.js index.html css/style.css css/build/global.css css/build/pages/samplepage.css js/bundle.js js/router/pages/index.js';

      exec('mkdir '+folderName);
      exec(addFolderNameToPaths(makeDirsTop));
      exec(addFolderNameToPaths(makeDirsInner));
      exec(addFolderNameToPaths(makeFiles));


      //exec('mkdir assets/img assets/fonts js/build js/build/router js/build/router/pages css/build css/build/pages');
      //exec('touch .env .gitignore package.json gulpfile.js index.js index.html css/style.css css/build/global.css css/build/pages/samplepage.css js/bundle.js js/router/pages/index.js');

      var gulpfile = folderName+'/gulpfile.js';

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

      var pjText = `{
        "name": "${folderName}",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "watch": "watchify index.js -o js/bundle.js -v"
        },
        "author": "planet telex vietnam",
        "license": "ISC"
      }
      `;

      var pJson = folderName+'/package.json';

      fs.writeFile(pJson, pjText, function(err){
        if(err)
          console.error(err);
      });

      var gIgnore = folderName+'/.gitignore';


      var gitignoreTxt = `*.DS_Store
      package.json
      gulpfile.js
      node_modules/
      public/assets/
      public/js/vendor/`;

      fs.writeFile(gIgnore, gitignoreTxt, function(err){
        if(err)
          console.error(err);
      });




      var landerPage = folderName+'/index.html';
      var landerTemplate = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Project</title>
        <link rel="stylesheet" href="css/style.css">
      </head>
      <body>
        <div id="wrapper">
          <div id="first-wrapper" class="page-wrapper">
            <div id="first-container" class="page-container">

            </div><!--page container-->
          </div><!--page wrapper-->
        </div><!--wrapper-->
        <script src="js/bundle.js"></script>
      </body>
      </html>`;


      fs.writeFile(landerPage, landerTemplate, function(err){
        if(err)
          console.error(err);
      });


      var mdFile = folderName+'/notes.md';
      var mdText = `#page generation
      1.) node gen pageTitle
      2.) add to router.js


      in two terminal tabs:
      gulp watch
      npm run watch


      #setup
      each page has an outer wrapper and an inner container
      wrapper displays as none and block
      container animates opacity; can have an overlay over the bg image set in wrapper
      `;

      fs.writeFile(mdFile, mdText, function(err){
        if(err)
          console.error(err);
      });


      exec('cp gen.js '+folderName+'/gen.js');

      //exec('npm --prefix ./'+folderName+'/ install jquery --save');
      //exec('npm --prefix ./'+folderName+'/ install watchify --save-dev');

      console.log('project setup; installing dependencies...');

     
    }
});