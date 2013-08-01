"use strict";

var package_json        = require('./../package.json');
var request             = require('request');
var _                   = require('underscore');
var GOODFILMS_ROOT_URL  = 'http://goodfil.ms';
var GOODFILMS_GRAPH_URL = GOODFILMS_ROOT_URL+'/graph/graph.json';

function goodfilmsGraph() {
  var goodfilmsGraph = {
    version: package_json.version,
    environment: process.env.NODE_ENV || "development",

    random: function(params, callback) {
      var params  = params || {};
      var self    = this;

      if (!params.x || params.x < 0) {
        params.x = 0;
      }
      if (!params.y || params.y < 0) {
        params.y = 0; 
      }
      if (params.x > 5) {
        params.x = 5;
      }
      if (params.y > 5) {
        params.y = 5;
      }

      request.get({url: GOODFILMS_GRAPH_URL, json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var filtered_points = _.filter(body.points, function(point) { return point.x >= params.x && point.y >= params.y });
          var random              = _.random(0, filtered_points.length-1);
          var film                = filtered_points[random];

          self._checkNetflix(film, function(film) {
            self._checkItunes(film, function(film) {
              self._checkAmazon(film, function(film) {
                self._checkHulu(film, function(film) {
                  return callback(null, film);        
                });
              });
            });
          });
        } else {
          return callback("There was an error", null);
        } 
      });
    },

    _checkNetflix: function(film, callback) {
      this._getProviderUrl(film, 'netflix_url', function(film) {
        return callback(film);
      });
    },
    _checkItunes: function(film, callback) {
      this._getProviderUrl(film, 'itunes_url', function(film) {
        return callback(film);
      });
    },
    _checkAmazon: function(film, callback) {
      this._getProviderUrl(film, 'amazon_url', function(film) {
        return callback(film);
      });
    },
    _checkHulu: function(film, callback) {
      this._getProviderUrl(film, 'hulu_url', function(film) {
        return callback(film);
      });
    },

    _getProviderUrl: function(film, phrase, callback) {
      var provider_url = GOODFILMS_ROOT_URL+film.url+"/"+phrase;

      this._urlExists(provider_url, function(err, exists) {
        if (exists) {
          film[phrase] = provider_url;
        } else {
          film[phrase] = null
        };

        return callback(film);
      });
    },

    _urlExists: function(url, callback) {
      request(url, function(error, response, body) {
        if (!!response && response.statusCode == 404) {
          callback(null, false);
        } else {
          callback(null, true);
        }
      });
    }
  }

  return goodfilmsGraph;
}

module.exports = goodfilmsGraph;
