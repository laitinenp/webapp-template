'use strict';

var debug = require('debug');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var server; 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// apply json, cookies and public directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Server API
app.use('/', routes);
app.use('/users', users);

app.set('port', process.env.PORT || 3000);

exports.listen = function () {
    server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
}

exports.close = function () {
    server.close(() => {
        debug('Server stopped.');
    });
}

this.listen();