var should = require('should'),
    app = require('./../src/main'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("html minify plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-postcompile-complete", function *() {
            true.should.be.true;
        });

        thoughtpad.notify("html-postcompile-request", { contents: "" });
    });

    it("should ignore requests with no content", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-postcompile-complete", function *() {
            true.should.be.false;
        });

        thoughtpad.notify("html-postcompile-request", { contents: "" });
    });

    it("should minify html from string", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-postcompile-complete", function *(contents) {
            contents.should.equal('<body><p>Hello there</p></body>');
        });

        thoughtpad.notify("html-postcompile-request", { contents: "<body>\n\t<p>Hello there</p> \n</body>", data: { collapseWhitespace: true } });
        
    });
});