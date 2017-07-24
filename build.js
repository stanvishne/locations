const copy = require('copy');

var copyFiles = function() {
    
    copy('index.html', 'build', function(err, file) {
        console.log('Copied to: ' + file[0].dest);
    });


    copy('dist/bundle.js', 'build', function(err, file) {
        console.log('Copied to: ' + file[0].dest);
    });
};

copyFiles();
