'use strict';

var restify = require('restify');
var Logger = require('bunyan');

// CONTROLLERS

var imagesController = require('./app/controllers/imagesController');

// LOGGER

var log = new Logger.createLogger({
  name: 'image-feed',
  serializers: {
    req: Logger.stdSerializers.req
  }
});

// SERVER

var server = restify.createServer({
  log: log
});

server.on('uncaughtException', function(req, res, route, err) {
  console.error(err.stack);
  process.exit(1);
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// SERVER CONFIG

server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());
server.use(restify.requestLogger());

// FILTERS

server.pre(restify.pre.userAgentConnection()); // for CURL compat
server.pre(function(req, res, next) {
  req.log.info({req: req}, 'REQUEST');
  next();
});

// ROUTES

// feed
server.get('/feed', imagesController.feed);
server.get('/image/:provider/:id', imagesController.image);

// public - app entry
server.get(/\/?.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));
