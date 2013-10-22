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

    // Model
    deepEqual(
        this.model.attributes,
        basics.model,
        'Model correctly retrieved.'
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
        nodes_nb: 2,
        node_test: {
          id: 0,
          node: {
            id: 0,
            label: 'Hello',
            attributes: {},
            viz: {}
          }
        },
        edges_nb: 1,
        edge_test: {
          id: 0,
          edge: {
            id: 0,
            label: '',
            source: 0,
            target: 1,
            type: 'directed',
            weight: 1
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
        nodes_nb: 2361,
        node_test: {
          id: 502,
          node: {
            attributes: {},
            id: 5443,
            label: 'YDR283C',
            viz: {}
          }
        },
        edges_nb: 7182,
        edge_test: {
          id: 1300,
          edge: {
            id: 14488,
            label: '',
            source: 5096,
            target: 6882,
            type: 'undirected',
            weight: 1
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
          {id: 0, title: 'url', type: 'string'},
          {id: 1, title: 'indegree', type: 'float'},
          {id: 2, title: 'frog', type: 'boolean', defaultValue: 'true'}
        ],
        nodes_nb: 4,
        node_test: {
          id: 1,
          node: {
            id: 1,
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
            id: 3,
            label: '',
            source: 2,
            target: 1,
            type: 'directed',
            weight: 1
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
          {id: 0, title: 'nodedef', type: 'string'},
          {id: 1, title: 'label', type: 'string'},
          {id: 2, title: 'occurrences', type: 'integer'}
        ],
        nodes_nb: 1715,
        node_test: {
          id: 1100,
          node: {
            id: 1102,
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
            id: 305,
            label: '',
            source: 263,
            target: 113,
            type: 'undirected',
            weight: 1
          }
        }
      }
    }
  ];


  // Running actual tests
  tests.map(function(t) {

    test(t.title, function() {
      var graph = GexfParser.parse('resources/' + t.gexf + '.gexf');
      console.log(t.title, graph);

      graph.testBasics(t.basics);
    });
  });
})();
