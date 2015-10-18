'use strict';

App.controller('feedController', function($scope, $http) {

  $scope.feed = [];

  var pageCounter = 1;

  var appendImagesToFeed = function(images) {
    $scope.feed = $scope.feed.concat(images);
    console.log('$scope.feed', $scope.feed);
  };

  var getImages = function(page) {
    console.log('getImages, page', page);

    $http.get('/feed', {params: {page: page}})
    .success(function(data, status, headers, config) {
      console.log('DATA', data);
      appendImagesToFeed(data);
    })
    .error(function(data, status, headers, config) {
      console.log('ERROR', data, status);
      $scope.errors = data;
    });
  };

  $scope.init = function() {
    getImages(1);
  };

  $scope.nextPage = function() {
    pageCounter++;
    getImages(pageCounter);
  };

});

