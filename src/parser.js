/*
| -------------------------------------------------------------------
|  GEXF Parser
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume (Yomguithereal)
| Version : 1.0
*/

;(function(undefined){

  'use strict';

  //------------------------------------------------------------------

  // Classes
  //===========

  // Graph Class
  //-------------
  function Graph(xml){

    // TODO: Controls GEXF
    // TODO: Deal with viz namespace


    // Basic Properties
    //
    var _rootElement = xml.getElementsByTagName('gexf')[0];
    var _graphElement = xml.getElementsByTagName('graph')[0];
    var _metaElement = xml.getElementsByTagName('meta')[0];
    var _modelElements = xml.getElementsByTagName('attribute');
    var _nodesElements = xml.getElementsByTagName('node');
    var _edgesElements = xml.getElementsByTagName('edge');

    var _hasViz = _rootElement.getAttribute("xmlns:viz") !== null;

    // Parser Functions
    //

    // Graph Version
    function _version(){
      return _rootElement.getAttribute('version') || '1.0';
    }

    // Graph Mode
    function _mode(){
      return _graphElement.getAttribute('mode') || 'static';
    }

    // Default Edge Type
    function _defaultEdgeType(){
      return _graphElement.getAttribute('defaultedgetype') || 'undirected';
    }

    // Meta Data
    function _metaData(){

      var metas = {};
      if(!_metaElement){
        return metas;
      }

      // Last modified date
      metas['lastmodifieddate'] = _metaElement.getAttribute('lastmodifieddate');

      // Other information
      var meta_children = _metaElement.childNodes.to_array();

      meta_children.map(function(child){
        metas[child.tagName] = child.textContent;
      });

      return metas;
    }

    // Models
    function _model(){
      var attributes = [];

      // Iterating through attributes
      _modelElements.to_array().map(function(attr){

        // Properties
        var properties = {
          id: attr.getAttribute('id') || attr.getAttribute('for'),
          type: attr.getAttribute('type') || 'string',
          title: attr.getAttribute('title') || ''
        };

        properties['id'] = parseInt(properties['id']);

        // Getting default
        var default_element = attr.childNodes.to_array();

        if(default_element.length > 0){
          properties['defaultValue'] = default_element[0].textContent;
        }

        // Creating attribute
        attributes.push(properties);
      });

      // TODO: What if attributes are not ordered correctly
      return {
        attributes: attributes
      };
    }

    // Nodes
    function _nodes(model){
      var nodes = [];

      // Iteration through nodes
      _nodesElements.to_array().map(function(node){

        // Basic properties
        var properties = {
          id: node.getAttribute('id'),
          label: node.getAttribute('label') || ''
        };

        // Retrieving data from nodes if any
        if(model.attributes.length > 0){
          properties['attributes'] = _nodeData(model, node);
        }

        // Retrieving viz information
        if(_hasViz){
          properties['viz'] = _nodeViz(node);
        }

        nodes.push(new Node(properties));
      });

      return nodes;
    }

    // Data from nodes
    function _nodeData(model, node){

      // TODO: Check if not att no default passes

      var data = {};
      var attvalues_elements = node.getElementsByTagName('attvalue');

      // Getting Node Indicated Attributes
      var attvalues_hash = attvalues_elements.to_hash(function(el){
        var attributes = el.attributes.to_object();
        var key = attributes['id'] || attributes['for'];

        // Returning object
        return {key: key, value: attributes['value']};
      });


      // Iterating through model
      model.attributes.map(function(attribute){

        // Default value?
        data[attribute.title] = (!(attribute.id in attvalues_hash) && "defaultValue" in attribute)
          ? __enforceType(attribute.type, attribute.defaultValue)
          : __enforceType(attribute.type, attvalues_hash[attribute.id]);

      });

      return data;
    }

    // Viz information from nodes
    function _nodeViz(node){
      // color (int rgba), position(int x, y, z), size (float), shape

      var viz = {};

      // Color
      // TODO: array or attr?
      var color_element = node.getElementsByTagName('color')[0];

      if(color_element){
        viz.color = [
          parseInt(color_element.getAttribute('r')),
          parseInt(color_element.getAttribute('b')),
          parseInt(color_element.getAttribute('g')),
          parseFloat(color_element.getAttribute('a')) || 1.0
        ]
      }

      // Position

      return viz;
    }

    // Edges
    function _edges(default_type){
      var edges = [];

      // Iteration through edges
      _edgesElements.to_array().map(function(edge){

        // Creating the edge
        var properties = edge.attributes.to_object();
        if(!'type' in properties){
          properties['type'] = default_type;
        }

        edges.push(new Edge(properties));
      });

      return edges;
    }


    // Properties
    //
    this.version = _version();
    this.mode = _mode();
    this.defaultEdgeType = _defaultEdgeType();
    this.meta = _metaData();
    this.model = _model();
    this.nodes = _nodes(this.model);
    this.edges = _edges();
  }


  // Node Class
  //------------
  function Node(properties){

    // Possible Properties
    this.id = parseInt(properties.id);
    this.label = properties.label;
    this.attributes = properties.attributes || {};
    this.viz = properties.viz || {};
  }


  // Edge Class
  //------------
  function Edge(properties){

    // Possible Properties
    this.id = parseInt(properties.id);
    this.type = properties.type || 'undirected';
    this.label = properties.label || '';
    this.source = parseInt(properties.source);
    this.target = parseInt(properties.target);
    this.weight = properties.weight || 1.0;
  }

  //------------------------------------------------------------------

  // Helpers
  //=========

  // TODO: Is Node order important?

  // Transform a NodeList Object to iterable array
  NodeList.prototype.to_array = function(){

    // Return array
    var children = [];

    // Iterating
    for(var i = this.length >>> 0; i--;){
      if(this[i].nodeName !== '#text'){
        children.push(this[i]);
      }
    }

    return children;
  }

  // Transform a NodeList Object into an indexed hash
  NodeList.prototype.to_hash = function(filter){

    // Return object
    var children = {};

    // Iterating
    for(var i = this.length >>> 0; i--;){
      if(this[i].nodeName !== '#text'){
        var prop = filter(this[i]);
        children[prop.key] = prop.value;
      }
    }

    return children;
  }

  // Transform NamedNodeMap into hash of attributes
  NamedNodeMap.prototype.to_object = function(){

    // Return object
    var attributes = {};

    // Iterating
    for(var i = this.length >>> 0; i--;){
      attributes[this[i].name] = this[i].value;
    }

    return attributes;

  }

  // Type Enforcing
  function __enforceType(type, value){

    switch(type){
      case 'boolean':
        value = (value === 'true');
        break;

      case 'integer':
      case 'long':
        value = parseInt(value);
        break;

      case 'float':
      case 'double':
        value = parseFloat(value);
        break;
    }

    return value;
  }

  //------------------------------------------------------------------

  // Inner Functions
  //=================

  // Fetching GEXF with XHR
  function __fetch(gexf_url){

    // XHR Request
    var request = new XMLHttpRequest();
    request.overrideMimeType('text/xml');
    request.open('GET', gexf_url, false);
    request.send();

    // Returning GEXF
    return request.responseXML;
  }

  // Parsing the GEXF File
  function _parse(gexf_url){

    // Composing Graph
    return new Graph(__fetch(gexf_url));
  }

  //------------------------------------------------------------------

  // Public API
  //============
  this.GexfParser = {

    // Functions
    parse: _parse,

    // Version
    version: '0.1'
  }

}).call(this);