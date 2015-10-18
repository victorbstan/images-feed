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

exports.getImages = function(callback) {
  // console.log('Instagram getImages');

  ig.media_popular(function(error, medias, remaining, limit) {
    if (error) {
      console.log('error', error);
      return;
    }
    // console.log('INSTAGRAM RESPONSE', medias, remaining, limit);

    var formattedResponse = formatResponse(medias);
    // console.log('INSTAGRAM', formattedResponse);

    return callback(formattedResponse);
  });
};
