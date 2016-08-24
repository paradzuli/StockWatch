'use strict';

/**
 * @ngdoc service
 * @name stockWatchApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockWatchApp.
 */
angular.module('stockWatchApp')
  .service('WatchlistService', function WatchlistService() {
      // AngularJS will instantiate a singleton by calling "new" on this function

      //[8] Create a stockModel object with save() function
      var StockModel = {
          save: function () {
              var watchlistFind = findById(this.listid);
              watchlistFind.recalculate();
              saveModel();
          }
      };

      //[9] Because a watchlist is composed of many stocks, create a WatchlistModel
      var WatchlistModel = {
          addStock1: function (stock) {
              var existingStock = _.find(this.stocks, function (s) {
                  return s.company.symbol === stock.company.symbol;
              });
              if (existingStock) {
                  existingStock.shares += stock.shares;
              } else {
                  _.extend(stock,StockModel);
                  this.stocks.push(stock);
              }
              this.recalculate();
              saveModel();
          },
          removeStock: function (stock) {
              _.remove(this.stocks, function (s) {
                  return s.company.symbol === stock.company.symbol;
              });
              this.recalculate();
              saveModel();
          },
          recalculate:function(){
              var calcs=_.reduce(this.stocks,function(calcs,stock){
                  calcs.shares+= stock.shares;
                  calcs.marketValue+= stock.marketValue;
                  calcs.dayChange+= stock.dayChange;
                  return calcs;
              },{shares:0, marketValue:0, dayChange:0});
              this.shares=calcs.shares;
              this.marketValue = calcs.marketValue;
              this.dayChange = calcs.dayChange;
          }
              
      };

      //[1] Helper: Load watchlists from localStorage
      var loadModel = function () {
          var model = {
              watchlists: localStorage['StockWatch.watchlists'] ? JSON.parse(localStorage['StockWatch.watchlists']) : [],
              nextId: localStorage['StockWatch.nextId'] ? parseInt(localStorage['StockWatch.nextId']) : 0
          };
          _.each(model.watchlists, function (watchlist) {
              _.extend(watchlist, WatchlistModel);
              _.each(watchlist.stocks, function (stock) {
                  _.extend(stock, StockModel);
              });
          });
          return model;
      };
      //[2]Helper: Save watchlists to localStorage
      var saveModel = function () {
          localStorage['StockWatch.watchlists'] = JSON.stringify(Model.watchlists);
          localStorage['StockWatch.nextId'] = Model.nextId;
      };

      //[3]Helper: Use lodash to find a watchlist with given ID
      var findById = function (listId) {
          return _.find(Model.watchlists, function (watchlist) { return watchlist.id === parseInt(listId); });
      };

      //[4]Return all watch lists or find by given id
      this.query = function (listId) {
          if (listId) {
              return findById(listId);
          } else {
              return Model.watchlists;
          }
      };

      //[5]Save a new watchlist to watchlists model
      this.save = function (watchlist) {
          watchlist.id = Model.nextId++;
          watchlist.stocks=[];
          _.extend(watchlist,WatchlistModel);
          Model.watchlists.push(watchlist);
          saveModel();
      };

      //[6] Remove given watchlist from watchlists model
      this.remove = function (watchlist) {
          _.remove(Model.watchlists, function (list) {
              return list.id === watchlist.id;
          });
          saveModel();
      };

      //[7] Initialize Model for this singleton service
      var Model = loadModel();
           
      
  });
