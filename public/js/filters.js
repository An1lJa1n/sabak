'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('stStatusFilter', ['$filter', function($filter) {
    return function(input, predicate){
        return true;
    }
  }]);
