'use strict';

/**
 * @ngdoc overview
 * @name stockWatchApp
 * @description
 * # stockWatchApp
 *
 * Main module of the application.
 */
angular
  .module('stockWatchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'googlechart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
        
      })
      .when('/watchlist/:listid', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl',
        controllerAs: 'watchlist'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
