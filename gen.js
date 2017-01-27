var fs = require('fs');
page = process.argv[2];

fs.stat('./js/build/router/pages/'+page+'.js', function(err, stat) {
    if(err == null) {
        console.log('that already exists');
    } else if(err.code == 'ENOENT') {
        // file does not exist

      jstext = `
      var wrapper = $('#-wrapper');
      var container = $('#-container');

      function removePage() {
        wrapper.css('display', 'none');
      }

      var openPage = function() {

      }

      var closePage = function() {

      }

      module.exports = {
        openPage: openPage,
        closePage: closePage
      }
      `;

      fs.writeFile('./js/build/router/pages/'+page+'.js', jstext, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log('js file created');
      });

      var cssText = '#'+page+`-wrapper {}

      #`+page+`-container {}`;
      fs.writeFile('./css/build/pages/'+page+'.css', cssText, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log('css file created');
      });


      var pagesAppend = "  "+page+": require('./"+page+".js'),";

      var pagesIndexFile = fs.readFileSync('./js/build/router/pages/index.js').toString().split("\n");
      pagesIndexFile.splice(1, 0, pagesAppend);
      var newFileText = pagesIndexFile.join("\n");

      fs.writeFile('./js/build/router/pages/index.js', newFileText, function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log(page + ' added to pages index');
        }
      });

    }//else - if file does not exist
});
