'use strict';

App.controller('imageController', function($scope, $http, $location, $anchorScroll) {

  console.log($location.path());

  $http.get($location.path())
  .success(function(data, status, headers, config) {
    // console.log('SUCCESS', data, status, headers, config);
    console.log('DATA', data);
    $scope.image = data;
    $anchorScroll();
  })
  .error(function(data, status, headers, config) {
    console.log('ERROR', data, status);
    $scope.errors = data;
  });

});

