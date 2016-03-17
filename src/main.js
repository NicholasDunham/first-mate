'use strict';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import './angular-material.min.css';
// import './controllers';
// import './factories';

angular.module('first-mate', [
  'ui.router',
  'ngResource',
  'ngMaterial'
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
    return $resource('/seamen/:nat/:port', {}, {
      get: {method: 'GET',
            isArray: true
      }
    });
  }])
  .factory('PortsFactory', ['$resource', function($resource) {
    return $resource('/ports/:nat', {}, {
      get: {method: 'GET',
            isArray: true
      }
    });
  }])

  .run(['SeamenFactory', function(SeamenFactory) {
    SeamenFactory.query();
  }])

  .controller('homeCtrl', ['$scope', 'SeamenFactory', 'PortsFactory', function($scope, SeamenFactory, PortsFactory) {
    $scope.nationalities = ['Spanish', 'British', 'French', 'Dutch', 'Hamburg', 'Swedish'];
    $scope.ports = [];

    $scope.getPorts = function() {
      PortsFactory.get({nat: $scope.user.nationalitySelect}, function(response) {
        response.forEach(function(elem) {
          $scope.ports.push(elem.Port);
        });
      });
    };

    $scope.getSeamen = function() {
      SeamenFactory.get({nat: $scope.user.nationalitySelect,
                        port: encodeURIComponent($scope.user.citySelect)
      }, function(response) {
        $scope.profileObjects = response;
      });
    };

  }]);
