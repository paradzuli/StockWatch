'use strict';

/**
 * @ngdoc service
 * @name stockWatchApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stockWatchApp.
 */
angular.module('stockWatchApp')
  .service('CompanyService', function CompanyService($resource) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      return $resource('companies.json');
  });
