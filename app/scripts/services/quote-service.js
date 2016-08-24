'use strict';

/**
 * @ngdoc service
 * @name stockWatchApp.QuoteService
 * @description
 * # QuoteService
 * Service in the stockWatchApp.
 */
angular.module('stockWatchApp')
  .service('QuoteService', function ($http,$interval) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      var stocks = [];
      var BASE = 'http://query.yahooapis.com/v1/public/yql';

      //[1] Handles updating stock model with appropriate data from quote
      var update = function (quotes) {
          console.log(quotes);
          if (quotes.length === stocks.length) {
              _.each(quotes, function (quote, idx) {
                  var stock1 = stocks[idx];
                  stock1.lastPrice = parseFloat(quote.LastTradePriceOnly) + _.random(-0.5,0.5);
                  stock1.change = quote.Change;
                  stock1.percentChange = quote.ChangeinPercent;
                  stock1.marketValue = stock1.shares * stock1.lastPrice;
                  stock1.dayChange = stock1.shares * parseFloat(stock1.change);
                  stock1.save();
              });
          }
      };

      //[2] Helper functions for managing which stocks to pull quotes for 
      this.register = function (stock) {
          stocks.push(stock);
      };
      this.deregister = function (stock) {
          _.remove(stocks, stock);
      };
      this.clear = function () {
          stocks = [];
      };

      //[3] Main processing function for communicating with Yahoo Finance API
      this.fetch = function () {
          var symbols = _.reduce(stocks, function (symbols, stock) {
              symbols.push(stock.company.symbol);
              return symbols;
          }, []);
          var query = encodeURIComponent('select * from yahoo.finance.quotes ' + 'where symbol in (\'' + symbols.join(',') + '\')');
          var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true' + '&env=http://datatables.org/alltables.env';
          $http.jsonp(url + '&callback=JSON_CALLBACK').success(function (data) {
              if (data.query.count) {
                  var quotes = data.query.count > 1 ? data.query.results.quote : [data.query.results.quote];
                  update(quotes);
              }
          }).error(function (data) {
              console.log(data);
          });
      };

      //[4] Used to fetch new quote data every 5 seconds
      $interval(this.fetch, 10000);
  });
