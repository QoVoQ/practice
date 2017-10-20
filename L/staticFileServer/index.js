var express = require('express');
var path = require('path');

var app = express();

app.use('/static', express.static(path.resolve(__dirname, "../Flip'em Good")));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

console.log(path.resolve(__dirname, "../Flip'em Good"));

app.get('/', (req, res) => {
  res.json({
    msg: 'Hello World'
  });
});

app.listen(4567, () => {
  console.log('listen on port 4567');
});
