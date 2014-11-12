/**
 * Gexf Parser Unit Tests
 * =======================
 *
 * Testing the parsing utilities of the gexf library.
 */

if (!('window' in this)) {
  var assert = require('assert'),
      gexf = require('../../index.js'),
      helpers = require('../helpers.js'),
      async = require('async');
}

describe('Parser', function() {
  this.timeout(5000);

  // Collection of tests expected results
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
        nodes_nb: 2,
        node_test: {
          id: 0,
          node: {
            id: '0',
            label: 'Hello'
          }
        },
        edges_nb: 1,
        edge_test: {
          id: 0,
          edge: {
            id: '0',
            label: '',
            source: '0',
            target: '1',
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
        nodes_nb: 2361,
        node_test: {
          id: 502,
          node: {
            id: '5443',
            label: 'YDR283C'
          }
        },
        edges_nb: 7182,
        edge_test: {
          id: 1300,
          edge: {
            id: '14488',
            label: '',
            source: '5096',
            target: '6882',
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
          {id: '0', title: 'url', type: 'string'},
          {id: '1', title: 'indegree', type: 'float'},
          {id: '2', title: 'frog', type: 'boolean', defaultValue: 'true'}
        ],
        nodes_nb: 4,
        node_test: {
          id: 1,
          node: {
            id: '1',
            label: 'Webatlas',
            attributes: {
              '0': 'http://webatlas.fr',
              '1': 2,
              '2': true
            }
          }
        },
        edges_nb: 5,
        edge_test: {
          id: 3,
          edge: {
            id: '3',
            label: '',
            source: '2',
            target: '1',
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
          {id: '0', title: 'nodedef', type: 'string'},
          {id: '1', title: 'label', type: 'string'},
          {id: '2', title: 'occurrences', type: 'integer'}
        ],
        nodes_nb: 1715,
        node_test: {
          id: 1100,
          node: {
            id: '1102',
            label: 'Interglacial Period',
            attributes: {
              '0': 'n1102',
              '1': 'Interglacial Period',
              '2': 3
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
        nodes_nb: 306,
        node_test: {
          id: 203,
          node: {
            id: '281',
            label: '282'
          }
        },
        edges_nb: 2345,
        edge_test: {
          id: 1602,
          edge: {
            id: '285',
            label: '',
            source: '38',
            target: '302',
            type: 'undirected',
            weight: 2
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
              '0': 'http://webatlas.fr',
              '1': 2,
              '2': true
            }
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
            weight: 1
          }
        }
      }
    },
    {
      title: 'Case & Attributes Graph',
      gexf: 'case',
      basics: {
        version: '1.2',
        mode: 'static',
        defaultEdgeType: 'directed',
        meta: {
          creator: 'polinode.com',
          description: 'Survey One',
          lastmodifieddate: '02-05-2014'
        },
        model: [
          {id: 'name', title: 'name', type: 'string'},
          {id: 'status', title: 'status', type: 'string'},
          {id: 'list', title: 'list', type: 'string'},
          {id: 'Gender', title: 'Gender', type: 'string'},
          {id: 'Position', title: 'Position', type: 'string'}
        ],
        edgeModel: [
          {id: 'Q1', title: 'Q1', type: 'string'}
        ],
        nodes_nb: 10,
        node_test: {
          id: 1,
          node: {
            id: '5362389af1e6696e0395864e',
            label: '2',
            attributes: {
              Gender: 'Female',
              Position: 'Graduate',
              list: 'Respondent',
              name: 'Cleopatra Cordray',
              status: 'Submitted'
            }
          }
        },
        edges_nb: 20,
        edge_test: {
          id: 3,
          edge: {
            id: '4',
            label: '',
            attributes: {
              Q1: 'true'
            },
            source: '5362389af1e6696e0395864e',
            target: '5362389af1e6696e03958654',
            type: 'directed',
            weight: 1
          }
        }
      }
    },
    {
      title: 'ListString Graph',
      gexf: 'liststring',
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
          {id: '0', title: 'types', type: 'liststring'},
          {id: '1', title: 'indegree', type: 'float'},
          {id: '2', title: 'frog', type: 'boolean', defaultValue: 'true'}
        ],
        nodes_nb: 4,
        node_test: {
          id: 0,
          node: {
            id: '0',
            label: 'Gephi',
            attributes: {
              '0': ['cooking', 'money'],
              '1': 1,
              '2': true
            }
          }
        },
        edges_nb: 5,
        edge_test: {
          id: 3,
          edge: {
            id: '3',
            label: '',
            source: '2',
            target: '1',
            type: 'directed',
            weight: 1
          }
        }
      }
    }
  ];

  // Most standard cases
  it('should be able to handle every standard cases.', function(done) {

    // Testing every gexf file
    async.parallel(
      tests.map(function(t, i) {
        return function(next) {

          helpers.fetch(t.gexf, function(graph) {
            var basics = tests[i].basics;

            // Root information
            assert.strictEqual(graph.version, basics.version, 'Version is retrieved.');
            assert.strictEqual(graph.mode, basics.mode, 'Mode is retrieved.');
            assert.strictEqual(
              graph.defaultEdgeType,
              basics.defaultEdgeType,
              'DefaultEdgeType is retrieved.'
            );

            // Meta
            assert.deepEqual(
              graph.meta,
              basics.meta,
              'Meta information is retrieved.'
            );

            // Node Model
            assert.deepEqual(
              graph.model.node,
              basics.model,
              'Node model correctly retrieved.'
            );

            // Edge Model
            assert.deepEqual(
              graph.model.edge,
              basics.edgeModel,
              'Edge model correctly retrieved.'
            );

            // Nodes
            assert.strictEqual(graph.nodes.length, basics.nodes_nb, 'All nodes retrieved.');
            assert.deepEqual(
              graph.nodes[basics.node_test.id],
              basics.node_test.node,
              'Node test passed.'
            );

            // Edges
            assert.strictEqual(graph.edges.length, basics.edges_nb, 'All edges retrieved.');
            assert.deepEqual(
              graph.edges[basics.edge_test.id],
              basics.edge_test.edge,
              'Edge test passed.'
            );

            next();
          });
        }
      }),
      done
    );
  });
});
