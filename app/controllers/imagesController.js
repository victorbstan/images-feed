'use strict';

var Q = require('q');
var _ = require('lodash');

var apiWrapper500px = require('../services/500px/api-wrapper.js');
var apiWrapperInstagram = require('../services/instagram/api-wrapper.js');

var getImages = function(page, callback) {
  var page = (page || 1);

  var promise1 = function() {
    var deferred = Q.defer();

    apiWrapper500px.getImages(page, function(imagesFrom500px) {
      // console.log('PROMISE imagesFrom500px', imagesFrom500px);

      if (imagesFrom500px) {
        deferred.resolve(imagesFrom500px);
      } else {
        deferred.reject();
      }
    });

    return deferred.promise;
  };

  var promise2 = function() {
    var deferred = Q.defer();

    apiWrapperInstagram.getImages(page, function(imagesFromInstagram) {
      // console.log('PROMISE imagesFromInstagram', imagesFromInstagram);

      if (imagesFromInstagram) {
        deferred.resolve(imagesFromInstagram);
      } else {
        deferred.reject();
      }

    });

    return deferred.promise;
  };

  var promises = [promise1(), promise2()];
  // console.log('PROMISES', promises);

  // WAIT FOR ALL SOURCES

  Q.all(promises)
  .then(function(results) {
    console.log('PROMISE RESULTS', results.length);

    console.log('here');

    var allImages = [];
    _.each(results, function(result) {
      console.log('RESULT', result.length);

      allImages.push(result);
    });
    var data = _.flatten(allImages);

    console.log('here 2', data.length, allImages.length);

    callback(data);
  });
};

var getImageForProviderAndId = function(provider, id, callback) {
  console.log('getImageForProviderAndId', provider, id);

  var data = {
    url: 'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    username: 'Bob',
    vote: 103,
    commentCount: 123,
    caption: 'blah blah'
  };

  switch (provider) {
  case '500px':
    apiWrapper500px.getOneImage(id, function(data) {
      callback(data);
    });
    break;
  case 'Instagram':
    apiWrapperInstagram.getOneImage(id, function(data) {
      callback(data);
    })
    break;
  default:
    throw 'Invalid provider';
    callback(null);
  }
};

// ACTIONS

exports.feed = function(req, res, next) {

  console.log('params', req.params);
  console.log('query', req.query);
  var page = req.params.page || 1;

  getImages(page, function(result) {
    // console.log('feed getImages RESULT', result);
    res.send(result);
  });

  return next();
};

exports.image = function(req, res, next) {

  var provider = req.params.provider;
  var id = req.params.id;
  console.log('IMAGE: provider, id', provider, id);

  getImageForProviderAndId(provider, id, function(result) {
    res.send(result);
  });

  return next();
};
