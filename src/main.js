var minifier = require('html-minifier').minify;

var init = function (thoughtpad) {
    thoughtpad.subscribe("html-postcompile-request", compile);
},

compile = function *(obj) {  
    if (!obj.contents) return;

    var data = { collapseWhitespace: true };

    if (obj.thoughtpad.config && obj.thoughtpad.config.eventData && obj.thoughtpad.config.eventData['html-postcompile']) {
        data = obj.thoughtpad.config.eventData['html-postcompile'];
    }

    yield obj.thoughtpad.notify("html-postcompile-complete", { contents: minifier(obj.contents, data), name: obj.name });
};

module.exports = {
    init: init
};