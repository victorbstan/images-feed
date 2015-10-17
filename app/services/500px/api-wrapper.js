'use strict';

//jscs:disable maximumLineLength

var API500px = require('500px');

exports.getImages = function(callback) {
  console.log('500px getImages');

  var api500px = new API500px('251YxA969WW86g2EpIv3UoLTiWdUTK6EAgvIzUXf');

  api500px.photos.getPopular({'sort': 'created_at', 'rpp': '100'},  function(error, results) {
    if (error) {
      console.log('error', error);
      return;
    }

    console.log('API500px RESPONSE', results);
    return callback(results);
  });

};
