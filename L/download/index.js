var fs = require('fs'),
  request = require('request');

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close',
      callback);
  });
};

download(
  'http://api.kingdee.com/kdrive/org/file/public?file_id=47089013&client_id=200242&scode=YXEyOWNxQmpFZWlxeTktUVpKcmgx&sign=54ca0271ebda28acf4b93ecbdba3cbbb0dff0858',
  'google.jpg',
  function() {
    console.log('done');
  });
