'use strict';

/**
 * @ngdoc directive
 * @name stockWatchApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockWatchApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
      return {
          //[1] Use as element attribute and require stkStockTable controller
          restrict: 'A',
          require: '^stkStockTable',
          scope:{
              stock1:'=',
              isLast:'='
          },
          //[2] the required controller will be made available at the end
      link: function ($scope, $element, $attrs, stockTableCtrl) {
          //[3] Create tooltip for stock-row
          $element.tooltip({
              placement: 'left',
              title: $scope.stock1.company.name
          });
          //[4] Add this row to the TableCtrl
          stockTableCtrl.addRow($scope);

          //[5]Register this stick with the QuoteService
          QuoteService.register($scope.stock1);

          //[6]Deregister company with the QuoteService on $destroy
          $scope.$on('$destroy', function () {
              stockTableCtrl.removeRow($scope);
              QuoteService.deregister($scope.stock1);
          });

          //[7]If this is the ast 'stock-row', fetch quotes immediately
          if ($scope.isLast) {
              $timeout(QuoteService.fetch);
          }

          //[8] Watch for changes in shares and recalculate fields
          $scope.$watch('stock1.shares', function () {
              $scope.stock1.marketValue = $scope.stock1.shares * $scope.stock1.lastPrice;
              $scope.stock1.dayChange = $scope.stock1.shares * parseFloat($scope.stock1.change);
              $scope.stock1.save();
          });
      }
    };
  });
