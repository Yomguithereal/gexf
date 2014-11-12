/**
 * GEXF Library Node Bindings
 * ===========================
 *
 * Author: PLIQUE Guillaume (Yomguithereal)
 * URL: https://github.com/Yomguithereal/gexf-parser
 * Version: 0.1.1
 */
var DOMParser = require('xmldom').DOMParser,
    DOMImplementation = require('xmldom').DOMImplementation,
    parser = require('./src/parser.js'),
    writer = require('./src/writer.js');

exports.parse = function(string) {
  var p = new DOMParser();
  var xml = p.parseFromString(string, 'application/xml');
  return parser.parse(xml);
}

exports.create = function() {
  return writer.create.apply(writer, Array.prototype.slice.call(arguments));
}
