/*
| -------------------------------------------------------------------
|  GEXF Parser Tests
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume (Yomguithereal)
| Version : 1.0
*/

(function() {

  // Helpers
  //---------

  Object.prototype.testBasics = function(basics) {

    // Root information
    strictEqual(this.version, basics.version, 'Version is retrieved.');
    strictEqual(this.mode, basics.mode, 'Mode is retrieved.');
    strictEqual(
      this.defaultEdgeType,
      basics.defaultEdgeType,
      'DefaultEdgeType is retrieved.'
    );

    // Meta
    deepEqual(
      this.meta,
      basics.meta,
      'Meta information is retrieved.'
    );

    // Node Model
    deepEqual(
      this.model.node,
      basics.model,
      'Node model correctly retrieved.'
    );

    // Edge Model
    deepEqual(
      this.model.edge,
      basics.edgeModel,
      'Edge model correctly retrieved.'
    );

    // Nodes
    strictEqual(this.nodes.length, basics.nodes_nb, 'All nodes retrieved.');
    deepEqual(
      this.nodes[basics.node_test.id],
      basics.node_test.node,
      'Node test passed.'
    );

    // Edges
    strictEqual(this.edges.length, basics.edges_nb, 'All edges retrieved.');
    deepEqual(
      this.edges[basics.edge_test.id],
      basics.edge_test.edge,
      'Edge test passed.'
    );
  };


  // Tests
  //-------
  var tests = [
    {
      title: 'Minimal Graph',
      gexf: 'minimal',
      basics: {
        version: '1.2',
        mode: 'static',
        defaultEdgeType: 'directed',
        meta: {
          creator: 'Gexf.net',
          description: 'A hello world! file',
          lastmodifieddate: '2009-03-20'
        },
        model: [],
        edgeModel: [],
        nodes_nb: 2,
        node_test: {
          id: 0,
          node: {
            id: '0',
            label: 'Hello',
            attributes: {},
            viz: {}
          }
        },
        edges_nb: 1,
        edge_test: {
          id: 0,
          edge: {
            id: '0',
            label: '',
            attributes: {},
            source: '0',
            target: '1',
            type: 'directed',
            weight: 1,
            viz: {}
          }
        }
      }
    },
    {
      title: 'Basic Graph',
      gexf: 'yeast',
      basics: {
        version: '1.1',
        mode: 'static',
        defaultEdgeType: 'undirected',
        meta: {},
        model: [],
        edgeModel: [],
        nodes_nb: 2361,
        node_test: {
          id: 502,
          node: {
            attributes: {},
            id: '5443',
            label: 'YDR283C',
            viz: {}
          }
        },
        edges_nb: 7182,
        edge_test: {
          id: 1300,
          edge: {
            id: '14488',
            label: '',
            attributes: {},
            source: '5096',
            target: '6882',
            type: 'undirected',
            weight: 1,
            viz: {}
          }
        }
      }
    },
    {
      title: 'Data Graph',
      gexf: 'data',
      basics: {
        version: '1.2',
        mode: 'static',
        defaultEdgeType: 'directed',
        meta: {
          creator: 'Gephi.org',
          description: 'A Web network',
          lastmodifieddate: '2009-03-20'
        },
        model: [
          {id: '0', title: 'url', type: 'string'},
          {id: '1', title: 'indegree', type: 'float'},
          {id: '2', title: 'frog', type: 'boolean', defaultValue: 'true'}
        ],
        edgeModel: [],
        nodes_nb: 4,
        node_test: {
          id: 1,
          node: {
            id: '1',
            label: 'Webatlas',
            attributes: {
              frog: true,
              indegree: 2,
              url: 'http://webatlas.fr'
            },
            viz: {}
          }
        },
        edges_nb: 5,
        edge_test: {
          id: 3,
          edge: {
            id: '3',
            label: '',
            attributes: {},
            source: '2',
            target: '1',
            type: 'directed',
            weight: 1,
            viz: {}
          }
        }
      }
    },
    {
      title: 'Viz Graph',
      gexf: 'arctic',
      basics: {
        version: '1.0',
        mode: 'static',
        defaultEdgeType: 'undirected',
        meta: {},
        model: [
          {id: '0', title: 'nodedef', type: 'string'},
          {id: '1', title: 'label', type: 'string'},
          {id: '2', title: 'occurrences', type: 'integer'}
        ],
        edgeModel: [],
        nodes_nb: 1715,
        node_test: {
          id: 1100,
          node: {
            id: '1102',
            label: 'Interglacial Period',
            attributes: {
              label: 'Interglacial Period',
              nodedef: 'n1102',
              occurrences: 3
            },
            viz: {
              color: 'rgb(153,255,255)',
              position: {
                x: -31.175037,
                y: 179.857,
                z: 0
              },
              size: 3.6317973
            }
          }
        },
        edges_nb: 6676,
        edge_test: {
          id: 305,
          edge: {
            id: '305',
            label: '',
            attributes: {},
            source: '263',
            target: '113',
            type: 'undirected',
            weight: 1,
            viz: {}
          }
        }
      }
    },
    {
      title: 'Celegans Graph',
      gexf: 'celegans',
      basics: {
        version: '1.1',
        mode: 'static',
        defaultEdgeType: 'undirected',
        meta: {},
        model: [],
        edgeModel: [],
        nodes_nb: 306,
        node_test: {
          id: 203,
          node: {
            id: '281',
            label: '282',
            attributes: {},
            viz: {}
          }
        },
        edges_nb: 2345,
        edge_test: {
          id: 1602,
          edge: {
            id: '285',
            label: '',
            attributes: {},
            source: '38',
            target: '302',
            type: 'undirected',
            weight: 2,
            viz: {}
          }
        }
      }
    },
    {
      title: 'Les Misérables Graph',
      gexf: 'les_miserables',
      basics: {
        version: '1.1',
        mode: 'static',
        defaultEdgeType: 'directed',
        meta: {
          creator: 'ofNodesAndEdges.com',
          title: 'Les Misérables, the characters coappearance weighted graph',
          lastmodifieddate: '2010-05-29+01:27'
        },
        model: [
          {id: 'authority', title: 'Authority', type: 'float'},
          {id: 'hub', title: 'Hub', type: 'float'}
        ],
        edgeModel: [],
        nodes_nb: 77,
        node_test: {
          id: 5,
          node: {
            id: '5.0',
            label: 'Geborand',
            attributes: {
              authority: 0.0034188034,
              hub: 0.0034188034
            },
            viz: {
              color: 'rgb(179,0,0)',
              position: {
                x: 318.6509,
                y: 85.41602,
                z: 0
              },
              size: 15
            }
          }
        },
        edges_nb: 254,
        edge_test: {
          id: 200,
          edge: {
            id: '198',
            label: '',
            attributes: {},
            source: '66.0',
            target: '62.0',
            type: 'directed',
            weight: 2,
            viz: {}
          }
        }
      }
    },
    {
      title: 'Edge Viz Graph',
      gexf: 'edge_viz',
      basics: {
        version: '1.1',
        mode: 'static',
        defaultEdgeType: 'directed',
        meta: {
          creator: 'Yomguithereal',
          title: 'An edge viz test graph',
          lastmodifieddate: '2010-05-29+01:27'
        },
        model: [
          {id: 'authority', title: 'Authority', type: 'float'},
          {id: 'hub', title: 'Hub', type: 'float'}
        ],
        edgeModel: [],
        nodes_nb: 2,
        node_test: {
          id: 0,
          node: {
            id: '0.0',
            label: 'Myriel',
            attributes: {
              authority: 0.01880342,
              hub: 0.01880342
            },
            viz: {
              color: 'rgb(216,72,45)',
              position: {
                x: 268.72385,
                y: 91.18155,
                z: 0
              },
              size: 22.714287
            }
          }
        },
        edges_nb: 1,
        edge_test: {
          id: 0,
          edge: {
            id: '0',
            label: '',
            attributes: {},
            source: '1.0',
            target: '0.0',
            type: 'directed',
            weight: 1,
            viz: {
              color: 'rgba(179,0,0,0.5)',
              thickness: 2,
              shape: 'dotted'
            }
          }
        }
      }
    },
    {
      title: 'Edge Data Graph',
      gexf: 'edge_data',
      basics: {
        version: '1.2',
        mode: 'static',
        defaultEdgeType: 'directed',
        meta: {
          creator: 'Gephi.org',
          description: 'A Web network',
          lastmodifieddate: '2009-03-20'
        },
        model: [
          {id: '0', title: 'url', type: 'string'},
          {id: '1', title: 'indegree', type: 'float'},
          {id: '2', title: 'frog', type: 'boolean', defaultValue: 'true'}
        ],
        edgeModel: [
          {id: 'predicate', title: 'Predicate', type: 'string', defaultValue: 'likes'},
          {id: 'confidence', title: 'Confidence', type: 'float'}
        ],
        nodes_nb: 4,
        node_test: {
          id: 1,
          node: {
            id: '1',
            label: 'Webatlas',
            attributes: {
              frog: true,
              indegree: 2,
              url: 'http://webatlas.fr'
            },
            viz: {}
          }
        },
        edges_nb: 5,
        edge_test: {
          id: 3,
          edge: {
            id: '3',
            label: '',
            attributes: {
              predicate: 'likes',
              confidence: 0.88
            },
            source: '2',
            target: '1',
            type: 'directed',
            weight: 1,
            viz: {}
          }
        }
      }
    }
  ];

  // Running actual tests
  module('Parser');
  tests.map(function(t) {

    asyncTest(t.title, function() {
      GexfParser.fetch(
        'resources/' + t.gexf + '.gexf',
        function(graph) {
          start();
          // graph.title = t.title;
          graph.testBasics(t.basics);
        }
      );
    });
  });

  module('API');
  asyncTest('GexfParser.fetch', function() {
    var g2,
        g1 = GexfParser.fetch('resources/minimal.gexf');

    GexfParser.fetch('resources/minimal.gexf', function(graph) {
      g2 = graph;
      start();
      deepEqual(g1, g2, 'GexfParser.fetch works the same in both sync and async modes.');
    });
  });
  test('GexfParser.parse', function() {
    var xhr = (function() {
      if (window.XMLHttpRequest)
        return new XMLHttpRequest();

      var names,
          i;

      if (window.ActiveXObject) {
        names = [
          'Msxml2.XMLHTTP.6.0',
          'Msxml2.XMLHTTP.3.0',
          'Msxml2.XMLHTTP',
          'Microsoft.XMLHTTP'
        ];

        for (i in names)
          try {
            return new ActiveXObject(names[i]);
          } catch (e) {}
      }

      return null;
    })();

    if (!xhr)
      throw 'XMLHttpRequest not supported, cannot load the file.';

    if (xhr.overrideMimeType)
      xhr.overrideMimeType('text/xml');
    xhr.open('GET', 'resources/minimal.gexf', false);
    xhr.send();

    var gexf = xhr.responseXML,
        graph = GexfParser.parse(gexf);

    graph.testBasics(tests[0].basics);
  });
})();
