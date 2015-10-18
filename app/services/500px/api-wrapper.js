'use strict';

//jscs:disable maximumLineLength

var _ = require('lodash');
var API500px = require('500px');
var api500px = new API500px('251YxA969WW86g2EpIv3UoLTiWdUTK6EAgvIzUXf');

var Image = require('../../models/image.js').Image;

var formatResponse = function(list) {
  console.log('formatResponse', list.length);

  var result = _.map(list, function(item) {
    // console.log('item', item);

    var image = {};

    image.provider = '500px';
    image.referenceId = item.id;
    image.url = item.image_url;
    image.author = item.user ? item.user.username : null;
    image.votes = item.rating;
    image.views = null;
    image.caption = item.description || item.name;

    if (item.comments) {
      // image.comments = {
      //   count: item.comments.count,
      //   data: _.map(item.comments.data, function(comment) {
      //     return {
      //       username: comment.from.username,
      //       text: comment.text,
      //       likes: null,
      //       created: comment.created_time
      //     }
      //   })
      // }
    }

    var imageModel = new Image();
    imageModel = _.merge(imageModel, image);

    return imageModel;
  });

  return _.compact(result);
};

exports.getImages = function(callback) {
  // console.log('500px getImages');

  api500px.photos.getPopular({'sort': 'created_at', 'rpp': '100'}, function(error, results) {
    if (error) {
      console.log('error', error);
      return;
    }

    var currentPage = results.current_page;
    var total_pages = results.total_pages;
    var total_items = results.total_items;
    var photos = results.photos;

    var formattedResponse = formatResponse(photos);
    // console.log('500px formattedResponse', formattedResponse);

    return callback(formattedResponse);
  });

};
