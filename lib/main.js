"use strict";

var package_json  = require('./../package.json');

function goodfilmsGraph() {
  var goodfilmsGraph = {
    version: package_json.version,
    environment: process.env.NODE_ENV || "development",
  }

  return goodfilmsGraph;
}

module.exports = goodfilmsGraph;
