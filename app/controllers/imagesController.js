'use strict';

var Q = require('q');

var apiWrapper500px = require('../services/500px/api-wrapper.js');
var apiWrapperInstagram = require('../services/instagram/api-wrapper.js');

exports.feed = function(req, res, next) {

  var promise1 = apiWrapper500px.getImages(function(imagesFrom500px) {
    // console.log('imagesFrom500px', imagesFrom500px);

    var deferred = Q.defer();

    if (imagesFrom500px) {
      deferred.resolve(imagesFrom500px);
    } else {
      deferred.reject();
    }

    return deferred.promise;
  });

  var promise2 = apiWrapperInstagram.getImages(function(imagesFromInstagram) {
    // console.log('imagesFromInstagram', imagesFromInstagram);

    var deferred = Q.defer();

    if (imagesFromInstagram) {
      deferred.resolve(imagesFromInstagram);
    } else {
      deferred.reject();
    }

    return deferred.promise;
  });

  var data = [
    {
      url: 'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
      username: 'Bob',
      vote: 103,
      commentCount: 123,
      caption: 'blah blah'
    },
    {
      url: 'http://rufflifechicago.com/wp-content/uploads/cat-treats.jpg',
      username: 'Suzy',
      vote: 23,
      commentCount: 44,
      caption: 'chip chop clap'
    }
  ];

  // var promises = [promise1, promise2];

  // Q.allSettled(promises)
  // .then(function(results) {
  //   console.log('PROMISE RESULTS', results);
  //   var data = results;
  //   res.send(data);
  // });

  // TEST
  apiWrapper500px.getImages(function(imagesFrom500px) {
    console.log('CALLBACK imagesFrom500px', imagesFrom500px);
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
