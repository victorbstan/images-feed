'use strict';

App.controller('feedController', function($scope, $http, $location) {

  $http.get('/feed')
  .success(function(data, status, headers, config) {
    // console.log('SUCCESS', data, status, headers, config);
    console.log('DATA', data);
    $scope.feed = data;
  })
  .error(function(data, status, headers, config) {
    console.log('ERROR', data, status);
    $scope.errors = data;
  });

  $scope.presentImage = function(data) {
    console.log('presentImage', data);

    var sanitizedImageUrl = window.encodeURIcomponent(data);

    $location.path('/image/' + sanitizedImageUrl);
  };

});

