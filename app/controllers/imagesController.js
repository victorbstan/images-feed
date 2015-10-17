'use strict';

var apiWrapper500px = require('../services/500px/api-wrapper.js');

exports.feed = function(req, res, next) {

  apiWrapper500px.getImages(function(imageFrom500px) {
    console.log('imageFrom500px', imageFrom500px);
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

  res.send(data);
  return next();
};

exports.image = function(req, res, next) {
  // fetch existing messages from db
  // Chat.find(function(err, data) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   res.send(data);
  // }).sort('-createdAt').limit(10);

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
