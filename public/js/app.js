'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','myApp.controllers','ngRoute','wxy.pushmenu','smart-table','ui.bootstrap', 'ngMessages'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexCtrl'
      }).
      when('/vehicalServices', {
        templateUrl: 'partials/drivers',
        controller: 'vehicalCtrl'
      }).
      when('/changePassword', {
        templateUrl: 'partials/changePassword',
        controller: 'ChangePasswordCtrl'
      }).
      when('/formsService', {
        templateUrl: 'partials/formsDetail',
        controller: 'formsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);