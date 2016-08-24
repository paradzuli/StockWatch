'use strict';

/**
 * @ngdoc directive
 * @name stockWatchApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockWatchApp')
  .directive('stkSignColor', function () {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
          //[1] use $observe to watch expression for changes
          $attrs.$observe('stkSignColor', function (newVal) {
              var newSign = parseFloat(newVal);
              //[2] Set element's style color value depending on sign
              if (newSign >= 0) {
                  $element[0].style.color = 'Green';
              } else {
                  $element[0].style.color = 'Red';
              }
          });
      }
    };
  });
