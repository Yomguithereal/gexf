;(function(undefined) {

  /**
   * GEXF Writer
   * ============
   *
   * Author: PLIQUE Guillaume (Yomguithereal)
   * URL: https://github.com/Yomguithereal/gexf-parser
   * Version: 0.1.1
   */

  /**
   * Main object
   */
  function Gexf(params) {
    params = params || {};

    var implementation = params.implementation || document.implementation;

    // Creating document
    this.document = implementation.createDocument(
      'http://www.gexf.net/1.2draft',
      'gexf',
      null
    );
    this.root = this.document.documentElement;

    // Assigning namespaces
    this.xmlns = params.namespace || 'http://www.gexf.net/1.2draft';
    this.root.setAttribute('xmlns',
      this.xmlns);
    this.root.setAttribute('xmlns:xsi',
      'http://www.w3.org/2001/XMLSchema-instance');
    this.root.setAttribute('xsi:schemaLocation',
      'http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd');

    // Version
    this.root.setAttribute('version', '1.2');

    // Encoding
    this.encoding = params.encoding || 'UTF-8';

    // Metas
    if (params.meta)
      this.setMeta(params.meta);

    console.log(this.document);
  }

  /**
   * Prototype
   */
  Gexf.prototype.createElement = function(tag, value, attributes) {
    if (!tag)
      throw Error('gexf.writer.createElement: wrong arguments.');

    if (typeof value === 'object') {
      attributes = value;
      value = null;
    }

    var node = this.document.createElement(tag);

    if (value) {
      var text = this.document.createTextNode(value);
      node.appendChild(text);
    }

    if (attributes) {
      for (var k in attributes)
        node.setAttribute(k, attributes[k]);
    }

    return node;
  };

  Gexf.prototype.setMeta = function(o) {
    var meta = this.document.createElement('meta'),
        o = o || {},
        m,
        n,
        t;

    for (m in o) {
      if (m === 'lastmodifieddate') {
        meta.setAttribute('lastmodifieddate', o[m]);
      }
      else {
        meta.appendChild(this.createElement(m, o[m]));
      }
    }

    // Appending meta to document
    this.root.appendChild(meta);

    return this;
  };

  Gexf.prototype.export = function() {
    return '<?xml version="1.0" encoding="' + this.encoding +'"?>\n' +
      this.root.outerHTML;
  };

  /**
   * Public interface
   * -----------------
   */
  function create(params) {
    return new Gexf(params);
  }

  /**
   * Exporting
   * ----------
   */
  var gexf = {

    // Functions
    create: create,

    // Version
    version: '0.1.1'
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = gexf;
    exports.gexf = gexf;
  }
  else if (typeof define === 'function' && define.amd) {
    define('gexf', [], function() {
      return gexf;
    });
  }
  else {

    if (typeof this.gexf !== 'undefined') {

      // Extending
      this.gexf.create = create;
    }
    else {

      // Creating
      this.gexf = gexf;
    }
  }

}).call(this);
