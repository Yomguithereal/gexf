/**
 * Gexf Unit Tests Helpers
 * ========================
 *
 * Miscellaneous helper functions.
 */

if (!('window' in this)) {

  // Node.js helpers
  var fs = require('fs'),
      gexf = require('../index.js');

  module.exports = {
    fetch: function(name, callback) {
      fs.readFile(__dirname + '/resources/' + name + '.gexf', {encoding: 'utf-8'}, function(err, data) {
        if (err) throw err;
        callback(gexf.parse(data));
      });
    }
  }
}
else {

  // Browser helpers
  var helpers = {
    fetch: function(name, callback) {
      gexf.fetch('../resources/' + name + '.gexf', callback);
    }
  };
}
