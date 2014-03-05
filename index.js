/**
 * GEXF Parser
 * ============
 *
 * Author: PLIQUE Guillaume (Yomguithereal)
 * URL: https://github.com/Yomguithereal/gexf-parser
 * Version: 0.1.0
 * Node.js Public Interface
 */
var DOMParser = require('xmldom').DOMParser,
    GexfParser = require('./src/parser.js');

var parse = function(string) {
  var p = new DOMParser();
  var xml = p.parseFromString(string, 'application/xml');
  return GexfParser.parse(xml);
};
