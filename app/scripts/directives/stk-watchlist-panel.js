'use strict';

/**
 * @ngdoc directive
 * @name stockWatchApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockWatchApp')
  .directive('stkWatchlistPanel', function ($location,$modal,$routeParams,WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope:{},
      link: function postLink($scope) {
          //Initialize variables
          //[2] initialize variables
          $scope.currentList = $routeParams.listid;
          $scope.watchlist = {};
          var addListModal = $modal({
              scope: $scope,
              template: 'views/templates/addlist-modal.html',
              show: false
          });

          //[3] Bind model from service to this scope
          $scope.watchlists = WatchlistService.query();

          //[4]Display addlist modal
          $scope.showModal = function () { addListModal.$promise.then(addListModal.show); };

          //[5] Create a new list from fields in modal
          $scope.createList = function () {
              WatchlistService.save($scope.watchlist);
              addListModal.hide();
              $scope.watchlist = {};
          };

          //[6] Delete desired list and redirect to home
          $scope.deleteList = function (list) {
              WatchlistService.remove(list);
              $location.path('/');
          };

          //[7] Go to details of list item
          $scope.gotoList = function (listid) {
              $location.path('watchlist/' + listid);
          };
      }
    };
  });
