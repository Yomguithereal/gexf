/*
| -------------------------------------------------------------------
|  GEXF Parser Tests
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume (Yomguithereal)
| Version : 1.0
*/

var graph = GexfParser.parse('resources/minimal.gexf');

console.log(graph);

var graph2 = GexfParser.parse('resources/yeast.gexf');

console.log(graph2);

var graph3 = GexfParser.parse('resources/data.gexf');

console.log(graph3);

var graph4 = GexfParser.parse('resources/arctic.gexf');

console.log(graph4);