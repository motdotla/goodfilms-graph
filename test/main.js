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

  describe('random()', function() {
    it('should have a film object', function(done) {
      this.timeout(10000);
      result.random({}, function(err, film) {
        film.title.should.not.be.undefined;

        done();
      });
    });
  });

  describe('_urlExists()', function() {
    it('should be true for an existing streamer url', function(done) {
      this.timeout(10000);
      result._urlExists('http://goodfil.ms/film/61003-the-motorcycle-diaries/netflix_url', function(err, exists) {
        exists.should.eql(true);

        done();
      });
    });

    it('should be false for a non-existing streamer url', function(done) {
      this.timeout(10000);
      result._urlExists('http://goodfil.ms/film/61003-the-motorcycle-diaries/hulu_url', function(err, exists) {
        exists.should.eql(false);

        done();
      });
    });
  });
});
