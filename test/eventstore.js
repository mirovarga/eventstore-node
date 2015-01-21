var es = require('../eventstore.js');
var assert = require('assert');

describe('eventstore', function () {
  describe('#add', function () {
    it('should add an event to the store', function (done) {
      es.add('customer1', 'created', {
        firstName: 'John',
        lastName: 'Smith'
      });

      assert.equal(1, es.all('customer1').length);
      assert.equal(0, es.all('customer2').length);
      done();
    });
  });

  describe('#on', function () {
    it('should react after an event has been stored', function (done) {
      es.on('created', function (event) {
        done();
      });
      es.on('deleted', function (event) {
        throw new Error("This shouldn't happen");
      });

      es.add('customer1', 'created', {
        firstName: 'John',
        lastName: 'Smith'
      });
    });
  });
});