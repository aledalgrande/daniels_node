
/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes');
require('express-namespace');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'owf873f273cdiqgfuegwu' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/daniels');

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.namespace('/admin', function(){
	app.get('/', express.basicAuth('username', 'password'), routes.admin);
});

app.listen(process.env.PORT || 5000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);