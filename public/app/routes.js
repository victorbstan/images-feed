'use strict';

// CLIENT ROUTES

App.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/views/feed.html',
      controller: 'feedController'
    })
    .when('/image/:id', {
      templateUrl: '/views/image.html',
      controller: 'imageController'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
