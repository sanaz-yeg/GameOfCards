'use strict';
var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var routes = require('./routes/index');

app.use('/', routes);

server.listen(6006, '0.0.0.0', function() {
  console.log("server starting on localhost port 6006" );
});
