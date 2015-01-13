thoughtpad-plugin-minifier-html
=================================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that responds to HTML post-compilation events. HTML files will be minified for use in the browser.

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/thoughtpad/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    minify = require('thoughtpad-plugin-minifier-html');

var thoughtpad = man.registerPlugins([minify]);
thoughtpad.subscribe("html-postcompile-complete", function (data) {
    console.log("Minified html returned here"); 
});
yield thoughtpad.notify("html-postcompile-request", { contents: "your html code here", data: {} });
```

You can pass in any options from the original [html-minifier](https://github.com/kangax/html-minifier) module and it will minify with those options.

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha --harmony-generators`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/thoughtpad/thoughtpad-plugin-minifier-html/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/thoughtpad/thoughtpad-plugin-minifier-html
[coveralls-image]: https://img.shields.io/coveralls/thoughtpad/thoughtpad-plugin-minifier-html/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thoughtpad/thoughtpad-plugin-minifier-html?branch=master
