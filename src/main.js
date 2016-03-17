'use strict';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
// import './controllers';
// import './factories';

angular.module('first-mate', [
  'ui.router',
  'ngResource'
])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
          function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/partials/home.html',
        controller: 'homeCtrl'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider.otherwise('/');
  }])

  .factory('SeamenFactory', ['$resource', function($resource) {
    return $resource('/seamen/:seaman');
  }])

  .run(['SeamenFactory', function(SeamenFactory) {
    SeamenFactory.query();
  }])

  .controller('homeCtrl', ['$scope', 'SeamenFactory', function($scope, SeamenFactory) {
    console.log('Running homeCtrl.');
    SeamenFactory.query(function(response) {
      $scope.profileObjects = response;
      console.log($scope.profileObjects);
    });
  }]);
