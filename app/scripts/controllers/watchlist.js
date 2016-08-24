'use strict';

/**
 * @ngdoc function
 * @name stockWatchApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockWatchApp
 */
angular.module('stockWatchApp')
  .controller('WatchlistCtrl', function ($scope,$routeParams,$modal, WatchlistService, CompanyService) {
      //[1] Initializations
      $scope.companies = CompanyService.query();
      $scope.watchlist1 = WatchlistService.query($routeParams.listid);
      $scope.listid = $routeParams.listid;
      $scope.stocks = $scope.watchlist1.stocks;
      $scope.newStock = {};
      var addStockModal = $modal({
          scope: $scope,
          template: 'views/templates/addstock-modal.html',
          show: false
      });

      //[2]Expose showStockModal to view via $scope
      $scope.showStockModal=function(){
          addStockModal.$promise.then(addStockModal.show);
      };

      //[3] Call the WatchlistModel addStock() function and hide the modal
      $scope.addStock = function () {

          //$scope.companies = CompanyService.query();
          //$scope.watchlist = WatchlistService.query($routeParams.listid);
          //$scope.stocks = $scope.watchlist.stocks;
          //$scope.newStock = {};

          $scope.watchlist1.addStock1({
              listid: $routeParams.listid,
              company: $scope.newStock.company,
              shares: $scope.newStock.shares
          });
          addStockModal.hide();
          $scope.newStock = {};
      };
  });
