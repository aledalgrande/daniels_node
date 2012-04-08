
/**
 * Module dependencies.
 */

exports = express = require('express'), fs = require('fs');
require('express-namespace');

// Configuration

exports = mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/daniels');
exports = Schema = mongoose.Schema;

// Bootstrap models
var models_path = __dirname + '/app/models';
var model_files = fs.readdirSync(models_path);
model_files.forEach(function(file){
	require(models_path+'/'+file);
});

var app = module.exports = express.createServer();

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: process.env.SECRET || 'owf873f273cdiqgfuegwu' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
var routes = require('./routes');
app.get('/', routes.index);

exports = username = process.env.ADMINUSERNAME || 'username'
	, password = process.env.ADMINPASSWORD || 'password';

// controllers

var controllers_path = __dirname + '/app/controllers';
var controller_files = fs.readdirSync(controllers_path);
controller_files.forEach(function(file){
	require(controllers_path + '/' + file)(app);
});

app.namespace('/admin', function(){
	app.get('/', express.basicAuth(username, password), routes.admin);
	app.get('/venues/new', express.basicAuth(username, password), routes.admin);
	app.get('/venues/:id', express.basicAuth(username, password), routes.admin);
	app.post('/venues/create', express.basicAuth(username, password), routes.admin);
	app.delete('/venues', express.basicAuth(username, password), routes.admin);
});

app.listen(process.env.PORT || 5000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);