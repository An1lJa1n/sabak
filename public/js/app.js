'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','myApp.controllers','ngRoute','wxy.pushmenu','smart-table','ui.bootstrap', 'ngMessages','ngFileUpload','ngFileSaver'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexCtrl'
      }).
      when('/vehicalServices/:status/:field', {
        templateUrl: 'partials/vehicals',
        controller: 'vehicalCtrl'
      }).
      when('/vehicalServices', {
        templateUrl: 'partials/vehicals',
        controller: 'vehicalCtrl'
      }).
      when('/changePassword', {
        templateUrl: 'partials/changePassword',
        controller: 'passwordCtrl'
      }).
      when('/driverServices', {
        templateUrl: 'partials/drivers',
        controller: 'driversCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);