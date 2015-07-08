'use strict';

var debug = require('debug')('node:server');
var http = require('http');
var globalConfig = require('./config/globalConfig.js');
var express = require('express');
var pathU = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongoose=require('mongoose');

var app = express();

global.config=globalConfig;
// view engine setup
app.set('views', pathU.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', true);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//mongoose
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/agronet-dev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	var libraryIndex=require('./utils/utilsLoadMongoose.js')(app);

	//passport
	require('./utils/utilsPassport.js')(app);

	var libraryIndex=require('./utils/utilsLoad.js')(app);
	app.route('/').get(function(req, res, next) {
	  res.render('index', { libraryIndex: libraryIndex });
	});

	//error handlers
	require('./utils/utilsErrorHandlers.js')(app);

	var port = globalConfig.port;
	app.set('port', port);

	var server = http.createServer(app);

	server.listen(port);
	server.on('error', function (error) {
		if (error.syscall !== 'listen') {
			throw error;
		}
		var bind = typeof port === 'string'?'Pipe '+port:'Port '+port;
		switch (error.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	});

	if(globalConfig.mode==='dev'){
		server.on('listening', function() {
			var addr = server.address();
			var bind = (typeof addr === 'string' ) ? ('pipe ' + addr) : 'port ' + addr.port;
			debug('Listening on ' + bind);
		});
	}
});
