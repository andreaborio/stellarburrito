var path = require('path');
var configResult = require('dotenv')
	.config({
		path: path.resolve(path.join(process.cwd(), 'toduba/configuration'), 'var.env')
	});
if (configResult.error)
	console.log('configResult.error: ' + configResult.error);
var fs = require('fs');
var express = require('express');
var app = express();
var db = require('./db');

global.__basedir = __dirname;
// app.js
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);
var banking = require('./banking/BankingApi');
app.use('/api/banking', banking);

var users = require('./users/UsersApi');
app.use('/api/user', users);
var functionalities = require('./functionalities/FunctionalitiesApi.js');
app.use('/api/functionalities', functionalities);
module.exports = app;
