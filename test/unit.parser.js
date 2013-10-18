/*
| -------------------------------------------------------------------
|  GEXF Parser Tests
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume (Yomguithereal)
| Version : 1.0
*/

(function(){

  // Helpers
  //---------
  function Node(){};
  function Edge(){};

  Object.prototype.testBasics = function(basics){

    // Root information
    strictEqual(this.version, basics.version, 'Version is retrieved.');
    strictEqual(this.mode, basics.mode, 'Mode is retrieved.');
    strictEqual(this.defaultEdgeType, basics.defaultEdgeType, 'Default edge type is retrieved.');

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

    console.log(this.nodes[basics.node_test.id], basics.node_test.node);
    // Edges
    strictEqual(this.edges.length, basics.edges_nb, 'All edges retrieved.');
    deepEqual(
      this.edges[basics.edge_test.id],
      basics.edge_test.edge,
      'Edge test passed.'
    );
  }


  // Tests
  //-------
  test('Minimal Graph', function(){

    // Parsing graph
    var graph = GexfParser.parse('resources/minimal.gexf');
    console.log(graph);

    // Checking
    graph.testBasics({
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
    });
  });

  // test('Basic Graph', function(){

  //   var graph = GexfParser.parse('resources/yeast.gexf');
  //   console.log(graph);

  //   // Checking
  //   graph.testBasics({
  //     version: '1.1',
  //     mode: 'static',
  //     defaultEdgeType: 'undirected',
  //     meta: {},
  //     model: [],
  //     nodes_nb: 2361,
  //     edges_nb: 7182
  //   });
  // });

  // test('Data Graph', function(){

  //   var graph = GexfParser.parse('resources/data.gexf');
  //   console.log(graph);

  //   // Checking
  //   graph.testBasics({
  //     version: '1.2',
  //     mode: 'static',
  //     defaultEdgeType: 'directed',
  //     meta: {
  //       creator: 'Gephi.org',
  //       description: 'A Web network',
  //       lastmodifieddate: '2009-03-20'
  //     },
  //     model: [
  //       {id: 0, title: 'url', type: 'string'},
  //       {id: 1, title: 'indegree', type: 'float'},
  //       {id: 2, title: 'frog', type: 'boolean', defaultValue: 'true'}
  //     ],
  //     nodes_nb: 4,
  //     edges_nb: 5
  //   });
  // });

})();


// TODO: test node, test edge, test viz