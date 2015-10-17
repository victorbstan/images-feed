'use strict';

// CLIENT ID a79129902e224edea7e9bd58d8b34cba
// CLIENT SECRET ed2359c9446d4a6ab72e961a18ea9d31

var ig = require('instagram-node').instagram();

ig.use({
  client_id: 'a79129902e224edea7e9bd58d8b34cba',
  client_secret: 'ed2359c9446d4a6ab72e961a18ea9d31'
});

exports.getImages = function(callback) {
  console.log('Instagram getImage');

  ig.media_popular(function(error, medias, remaining, limit) {
    if (error) {
      console.log('error', error);
      return;
    }
    console.log('INSTAGRAM RESPONSE', medias, remaining, limit);

    callback({medias: medias, remaining: remaining, limit: limit});
  });
};
