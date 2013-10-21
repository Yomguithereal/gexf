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
  //=========

  // Graph Class
  //-------------
  function Graph(xml){

    // TODO: Controls GEXF

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
      metas.lastmodifieddate = _metaElement.getAttribute('lastmodifieddate');

      // Other information
      var meta_children = __nodeListToArray(_metaElement.childNodes);

      meta_children.map(function(child){
        metas[child.tagName] = child.textContent;
      });

      return metas;
    }

    // Models
    function _model(){
      var attributes = [];

      // Iterating through attributes
      __nodeListToArray(_modelElements).map(function(attr){

        // Properties
        var properties = {
          id: +(attr.getAttribute('id') || attr.getAttribute('for')),
          type: attr.getAttribute('type') || 'string',
          title: attr.getAttribute('title') || ''
        };

        // Getting default
        var default_element = __nodeListToArray(attr.childNodes);

        if(default_element.length > 0){
          properties.defaultValue = default_element[0].textContent;
        }

        // Creating attribute
        attributes.push(properties);
      });

      return {
        attributes: attributes
      };
    }

    // Nodes
    function _nodes(model){
      var nodes = [];

      // Iteration through nodes
      __nodeListToArray(_nodesElements).map(function(node){

        // Basic properties
        var properties = {
          id: node.getAttribute('id'),
          label: node.getAttribute('label') || ''
        };

        // Retrieving data from nodes if any
        if(model.attributes.length > 0){
          properties.attributes = _nodeData(model, node);
        }

        // Retrieving viz information
        if(_hasViz){
          properties.viz = _nodeViz(node);
        }

        nodes.push(Node(properties));
      });

      return nodes;
    }

    // Data from nodes
    function _nodeData(model, node){

      var data = {};
      var attvalues_elements = node.getElementsByTagName('attvalue');

      // Getting Node Indicated Attributes
      var attvalues_hash = __nodesListToHash(attvalues_elements, function(el){
        var attributes = __namedNodeMapToObject(el.attributes);
        var key = +(attributes.id || attributes['for']);

        // Returning object
        return {key: key, value: attributes.value};
      });


      // Iterating through model
      model.attributes.map(function(attribute){

        // Default value?
        data[attribute.title] = (!(attribute.id in attvalues_hash) && "defaultValue" in attribute) ?
          __enforceType(attribute.type, attribute.defaultValue) :
          __enforceType(attribute.type, attvalues_hash[attribute.id]);

      });

      return data;
    }

    // Viz information from nodes
    function _nodeViz(node){
      var viz = {};

      // Color
      var color_element = __getFirstElementByTagNS(node, ['viz', 'color']);

      if(color_element){
        var color = ['r', 'g', 'b', 'a'].map(function(c){
          return color_element.getAttribute(c);
        });

        viz.color = (color[4]) ?
          'rgba(' + color.join(',') + ')' :
          'rgb(' + color.slice(0, -1).join(',') + ')';
      }

      // Position
      var position_element = __getFirstElementByTagNS(node, ['viz', 'position']);

      if(position_element){
        viz.position = {};

        ['x', 'y', 'z'].map(function(p){
          viz.position[p] = +position_element.getAttribute(p);
        });
      }

      // Size & Shape
      ['size', 'shape'].map(function(t){
        var element = __getFirstElementByTagNS(node, ['viz', t]);

        if(element){
          viz[t] = (t === 'size') ?
            +element.getAttribute('value') :
            element.getAttribute('value');
        }
      });

      return viz;
    }

    // Edges
    function _edges(default_type){
      var edges = [];

      // Iteration through edges
      __nodeListToArray(_edgesElements).map(function(edge){

        // Creating the edge
        var properties = __namedNodeMapToObject(edge.attributes);
        if(!('type' in properties)){
          properties.type = default_type;
        }

        edges.push(Edge(properties));
      });

      return edges;
    }


    // Properties
    //
    var model = _model();
    var defaultedgetype = _defaultEdgeType();

    return {
      version : _version(),
      mode : _mode(),
      defaultEdgeType : defaultedgetype,
      meta : _metaData(),
      model : model,
      nodes : _nodes(model),
      edges : _edges(defaultedgetype)
    };
  }

  // TODO: Remove constructor --> basic objects
  // --> object return object
  // Rework graph

  // Node Class
  //------------
  function Node(properties){

    // Possible Properties
    return {
      id : +properties.id,
      label : properties.label,
      attributes : properties.attributes || {},
      viz : properties.viz || {}
    };
  }


  // Edge Class
  //------------
  function Edge(properties){

    // Possible Properties
    return {
      id : +properties.id,
      type : properties.type || 'undirected',
      label : properties.label || '',
      source : +properties.source,
      target : +properties.target,
      weight : properties.weight || 1.0
    };
  }

  //------------------------------------------------------------------

  // Helpers
  //=========

  // Using prototypes was a bad idea, so I chose to make good old functions

  // Transform a NodeList Object to iterable array
  function __nodeListToArray(nodeList){

    // Return array
    var children = [];

    // Iterating
    for(var i = 0; i < nodeList.length; i++){
      if(nodeList[i].nodeName !== '#text'){
        children.push(nodeList[i]);
      }
    }

    return children;
  }

  // Transform a NodeList Object into an indexed hash
  function __nodesListToHash(nodeList, filter){

    // Return object
    var children = {};

    // Iterating
    for(var i = 0; i < nodeList.length; i++){
      if(nodeList[i].nodeName !== '#text'){
        var prop = filter(nodeList[i]);
        children[prop.key] = prop.value;
      }
    }

    return children;
  }

  // Transform NamedNodeMap into hash of attributes
  function __namedNodeMapToObject(nodeMap){

    // Return object
    var attributes = {};

    // Iterating
    for(var i = 0; i < nodeMap.length; i++){
      attributes[nodeMap[i].name] = nodeMap[i].value;
    }

    return attributes;
  }

  // Get first element by namespaced tag name
  function __getFirstElementByTagNS(node, ns_tag){
    var element = node.getElementsByTagName(ns_tag[1])[0];

    if(!element)
      element = node.getElementsByTagNameNS(ns_tag[0], ns_tag[1])[0];

    if(!element)
      element = node.getElementsByTagName(ns_tag.join(':'))[0];

    return element;
  }

  // Type Enforcing
  function __enforceType(type, value){

    switch(type){
      case 'boolean':
        value = (value === 'true');
        break;

      case 'integer':
      case 'long':
      case 'float':
      case 'double':
        value = +value;
        break;
    }

    return value;
  }

  //------------------------------------------------------------------

  // Inner Functions
  //=================

  // Fetching GEXF with XHR
  function __fetch(gexf_url){

    // TODO: Check if really asynchronous
    // XHR Request
    var request = window.XMLHttpRequest ?
      new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHTTP');

    request.overrideMimeType('text/xml');
    request.open('GET', gexf_url, false);
    request.send();

    // Returning GEXF
    return request.responseXML;
  }

  // Parsing the GEXF File
  // TODO: parse xml or url
  function _parse(gexf_url){

    // Composing Graph
    return Graph(__fetch(gexf_url));
  }

  //------------------------------------------------------------------

  // Public API
  //============
  this.GexfParser = {

    // Functions
    parse: _parse,

    // Version
    version: '0.1'
  };

}).call(this);
