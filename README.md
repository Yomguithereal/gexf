[![Build Status](https://travis-ci.org/Yomguithereal/gexf-parser.png)](https://travis-ci.org/Yomguithereal/gexf-parser)

#GEXF JavaScript Library

##Description
This gexf parser is designed to fetch a remote .gexf file and parse it into a javascript object for later manipulation. It was developed to be used with [sigma](https://github.com/jacomyal/sigma.js) and can be compiled as a [sigma plugin](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.parsers.gexf).

##Usage
The gexf can be used either to fetch and parse the .gexf file or just to parse it if you want to fetch it by your own means. The parser adds a `gexf` variable to your global scope so you can use it.


**Fetching and parsing**
```js
// Synchronously fetch the gexf and parse it
var graph = gexf.fetch('/url/to/file.gexf');

// Asynchronously fetch the gexf and parse it
gexf.fetch('/url/to/file.gexf', function(graph) {
  console.log(graph);
});
```

**Parsing only**

If you want to fetch the gexf yourself, you can still parse the graph by providing a javascript DOM object to the parser (an ajax XML response or a parsed string, for instance). 
```js
// Converting a string to a DOM object
var gexf_dom = new DOMParser().parseFromString(gexf_string, "application/xml");

// Parsing the gexf
var graph = gexf.parse(gexf_dom);
```

## Build
If you want to build the minify version, clone this repo and launch the uglify grunt task.

```bash
git clone git@github.com:Yomguithereal/gexf-parser.git
cd gexf-parser
npm install
grunt uglify
```

## Output Data
The following example shows what the parser is able to output given a gexf file.

```js
{
  version "1.0.1",
  meta: {
    creator: "Yomguithereal",
    lastmodifieddate: "2010-05-29+01:27",
    title: "A random graph"
  },
  defaultEdgeType: "directed",
  model: [
    {
      id: "authority",
      type: "float",
      title: "Authority"
    },
    {
      id: "name",
      type: "string",
      title: "Author's name"
    }
  ],
  nodes: [
    {
      id: "0",
      label: "Myriel",
      attributes: {
        authority: 10.43,
        name: "Myriel Dafault"
      },
      viz: {
        color: "rgb(216,72,45)",
        size: 22.4,
        position: {
          x: 234,
          y: 23,
          z: 0
        }
      }
    },
    {
      id: "1",
      label: "Jean",
      attributes: {
        authority: 2.43,
        name: "Jean Daguerre"
      },
      viz: {
        color: "rgb(255,72,45)",
        size: 21.4,
        position: {
          x: 34,
          y: 23,
          z: 0
        }
      }
    }
  ],
  edges: [
    {
      id: "0",
      source: "0",
      target: "1",
      type: "directed",
      weight: 1,
      viz: {
        shape: "dotted"
      }
    }
  ]
}
```

##Contribution
Please feel free to contribute. To set up the dev environment you should have **nodejs**, **npm** and **grunt** installed.

Also, to lint the files, you need [gjslint](https://developers.google.com/closure/utilities/docs/linter_howto?hl=fr).

```bash
git clone git@github.com:Yomguithereal/gexf-parser.git
cd gexf-parser
npm install
```

Be sure to add relevant unit tests and pass the linter before submitting any change to the parser. The default grunt command will lint the files, run the tests and minify the code into `build/gexf.min.js`.
