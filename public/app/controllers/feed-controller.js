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

  // $http.get('/chat').
  //   success(function(data, status, headers, config) {
  //     console.log('/chat get SUCCESS', data, status, headers, config);
  //     $scope.messages = data;
  //   }).
  //   error(function(data, status, headers, config) {
  //     console.log('/chat get ERROR', data, status, headers, config);
  //     $scope.errors = data;
  //   });

  // $scope.submit = function() {
  //   if (this.myBody) {
  //     // client side update
  //     var newMessage = {
  //       'nickname': this.myNickname || 'Anonymous',
  //       'body': this.myBody,
  //       'createdAt': new Date().toISOString()
  //     };

  //     // clear form
  //     $scope.myBody = '';

  //     // persist
  //     $http.post('/chat', newMessage).
  //       success(function(data, status, headers, config) {
  //         console.log('/chat post SUCCESS', data, status, headers, config);
  //         $scope.messages.push(newMessage);
  //         console.log($scope.messages);
  //       }).
  //       error(function(data, status, headers, config) {
  //         console.log('/chat post ERROR', data, status, headers, config);
  //         $scope.errors = data;
  //       });
  //   }
  // };

});

