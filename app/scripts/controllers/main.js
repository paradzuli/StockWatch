'use strict';

/**
 * @ngdoc function
 * @name stockWatchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockWatchApp
 */
angular.module('stockWatchApp')
  .controller('MainCtrl', function ($scope,$location,WatchlistService) {
      //[1] Populate watchlists for dynamic nav links
      $scope.watchlists = WatchlistService.query();

      //[2]Using the $location.path() function as a $watch expression
      $scope.$watch(function () {
          return $location.path();
      }, function (path) {
          if (path.indexOf('watchlist') !== -1) {
              $scope.activeView = 'watchlist';
          } else {
              $scope.activeView = 'dashboard';
          }
      });
  });
