var minifier = require('html-minifier').minify,
    _thoughtpad;

var init = function (thoughtpad) {
    _thoughtpad = thoughtpad;
    _thoughtpad.subscribe("html-postcompile-request", compile);
},

compile = function *(obj) {  
    if (!obj.contents) return;

    yield _thoughtpad.notify("html-postcompile-complete", minifier(obj.contents, obj.data));
};

module.exports = {
    init: init
};