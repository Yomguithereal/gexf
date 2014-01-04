# Gexf-Parser

## Description
This parser is designed to fetch a remote .gexf file and parse it into a javascript object for later manipulation. It was developed to be used with [sigma 1.0.0 version](https://github.com/jacomyal/sigma.js/tree/draft-v1.0.0) and can be compiled as a [sigma plugin](https://github.com/jacomyal/sigma.js/tree/draft-v1.0.0/plugins/sigma.parsers.gexf).

## Usage
The GexfParser can be used either to fetch and parse the .gexf file or just to parse it if you want to fetch it by your own means. The parser adds a GexfParser variable to your global scope so you can use it.

```js
// Synchronously fetch the gexf and parse it
var gexf = GexfParser.fetch('/url/to/file.gexf');

// Asynchronously fetch the gexf and parse it
GexfParser.fetch('/url/to/file.gexf', function(gexf) {
    console.log(gexf);
});

// Just parse a gexf string
var gexf = GexfParser.parse(gexf_string);
```

## Contribution
Please feel free to contribute. To set up the dev environment you should have nodejs, npm and grunt installed.

```bash
git clone git@github.com:Yomguithereal/gexf-parser.git
cd gexf-parser
npm install
```

Be sure to add relevant unit tests and pass the linter before submitting any change to the parser. The default grunt command will lint the files, run the tests and minify the code into *build/gexf-parser.min.js*.
