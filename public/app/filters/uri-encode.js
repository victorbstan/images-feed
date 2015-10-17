'use strict';

angular.module('app.filters.encodeURIComponent', [])
.filter(function() {
  return window.encodeURIComponent;
});
