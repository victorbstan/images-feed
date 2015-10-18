'use strict';

// CLIENT ID a79129902e224edea7e9bd58d8b34cba
// CLIENT SECRET ed2359c9446d4a6ab72e961a18ea9d31

var _ = require('lodash');
var ig = require('instagram-node').instagram();
ig.use({
  client_id: 'a79129902e224edea7e9bd58d8b34cba',
  client_secret: 'ed2359c9446d4a6ab72e961a18ea9d31'
});

var Image = require('../../models/image.js').Image;

var formatResponse = function(list) {
  console.log('formatResponse', list.length);

  var result = _.map(list, function(item) {
    // console.log('item', item);

    if (item.type === 'image') {
      var image = {};

      image.provider = 'Instagram';
      image.referenceId = item.id;
      image.url = item.images ? item.images.standard_resolution.url : null;
      image.author = item.user ? item.user.username : null;
      image.votes = item.likes ? item.likes.count : null;
      image.views = null;
      image.caption = item.caption ? item.caption.text : null;
      image.created = new Date(item.created_time * 1000);

      if (item.comments) {
        image.comments = {
          count: item.comments.count,
          data: _.map(item.comments.data, function(comment) {
            return {
              username: comment.from.username,
              text: comment.text,
              likes: null,
              created: comment.created_time
            }
          })
        }
      }

      var imageModel = new Image();
      imageModel = _.merge(imageModel, image);

      return imageModel;
    } else {
      return;
    }
  });

  return _.compact(result);
};

exports.getImages = function(page, callback) {
  // console.log('Instagram getImages');

  ig.user_media_recent('4851835', function(error, medias, pagination, remaining, limit) {
    // ig.media_popular(function(error, medias, remaining, limit) {
    if (error) {
      console.log('ERROR', error);
      return;
    }
    console.log('INSTAGRAM RESPONSE', pagination, remaining, limit);

    var formattedResponse = formatResponse(medias);
    // console.log('INSTAGRAM', formattedResponse);

    return callback(formattedResponse);
  });
};

exports.getOneImage = function(id, callback) {
  console.log('Instagram getOneImage id', id);

  ig.media(id, function(error, media, remaining, limit) {
    if (error) {
      console.log('ERROR', error);
      return;
    }

    var image = {};

    image.provider = 'Instagram';
    image.referenceId = media.id;
    image.url = media.images ? media.images.standard_resolution.url : null;
    image.author = media.user ? media.user.username : null;
    image.votes = media.likes ? media.likes.count : null;
    image.views = null;
    image.caption = media.caption ? media.caption.text : null;
    image.created = new Date(media.created_time * 1000);

    if (media.comments) {
      image.comments = {
        count: media.comments.count,
        data: _.map(media.comments.data, function(comment) {
          return {
            username: comment.from.username,
            text: comment.text,
            likes: null,
            created: comment.created_time
          }
        })
      }
    }

    var imageModel = new Image();
    imageModel = _.merge(imageModel, image);

    callback(imageModel);
  });
};
