'use strict';

exports.Image = function() {

  return {
    provider: '',
    referenceId: '',
    url: '',
    author: '',
    votes: '',
    views: '',
    caption: '',
    comments: {
      count: 0,
      data: {
        username: '',
        text: '',
        likes: '',
        created: '',
      }
    }
  }

};
