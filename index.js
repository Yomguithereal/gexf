/**
 * GEXF Library Node Bindings
 * ===========================
 *
 * Author: PLIQUE Guillaume (Yomguithereal)
 * URL: https://github.com/Yomguithereal/gexf-parser
 * Version: 0.1.1
 */
var DOMParser = require('xmldom').DOMParser,
    gexf = require('./src/parser.js');

exports.parse = function(string) {
  var p = new DOMParser();
  var xml = p.parseFromString(string, 'application/xml');
  return gexf.parse(xml);
}
