var assert            = require('assert'),
    should            = require('should'),
    goodfilmsGraph    = require('../lib/main');

var result;

describe('goodfilms-graph', function() {
  before(function() {
    result = goodfilmsGraph();
  });

  it('version should be set', function() {
    result.version.should.eql("0.0.1"); 
  });
});
