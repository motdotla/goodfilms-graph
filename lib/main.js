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

    random: function(callback) {
      var self = this;

      request.get({url: GOODFILMS_GRAPH_URL, json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var filtered_points = _.filter(body.points, function(point) { return point.x >= 4; });
          var random              = _.random(0, filtered_points.length-1);
          var film                = filtered_points[random];

          var provider_phrases    = ["netflix_url", "itunes_url", "amazon_url", "hulu_url"]
          var phrase = GOODFILMS_ROOT_URL+film.url+"/netflix_url";
          self._urlExists(GOODFILMS_ROOT_URL+film.url+"/"phrase, function(err, exists) {
            if (exists) {
              film[phrase] = provider_url;
            } else {
              film[phrase] = null
            };
            
            return callback(null, film);
          });
        } else {
          return callback("There was an error", null);
        } 
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
