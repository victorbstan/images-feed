'use strict';

var Q = require('q');
var _ = require('lodash');

var apiWrapper500px = require('../services/500px/api-wrapper.js');
var apiWrapperInstagram = require('../services/instagram/api-wrapper.js');

var getImages = function(callback) {
  var promise1 = function() {
    var deferred = Q.defer();

    apiWrapper500px.getImages(function(imagesFrom500px) {
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

    apiWrapperInstagram.getImages(function(imagesFromInstagram) {
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

exports.feed = function(req, res, next) {

  // var data = [
  //   {
  //     url: 'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  //     username: 'Bob',
  //     vote: 103,
  //     commentCount: 123,
  //     caption: 'blah blah'
  //   },
  //   {
  //     url: 'http://rufflifechicago.com/wp-content/uploads/cat-treats.jpg',
  //     username: 'Suzy',
  //     vote: 23,
  //     commentCount: 44,
  //     caption: 'chip chop clap'
  //   }
  // ];

  // TEST
  // apiWrapper500px.getImages(function(imagesFrom500px) {
  //   console.log('CALLBACK imagesFrom500px', imagesFrom500px);
  // });

  getImages(function(result) {
    // console.log('feed getImages RESULT', result);
    res.send(result);
  });

  return next();
};

exports.image = function(req, res, next) {

  var provider = req.provider;
  var id = req.id;
  console.log('IMAGE: provider, id', provider, id);

  var data = {
    url: 'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    username: 'Bob',
    vote: 103,
    commentCount: 123,
    caption: 'blah blah'
  };

  res.send(data);
  return next();
};
