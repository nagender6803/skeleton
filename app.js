var express = require('express');

var path = require('path');

var app = express();

app.set('app/views', path.join(__dirname, 'app/views'));

app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname, 'app/views/index.html'));

});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
