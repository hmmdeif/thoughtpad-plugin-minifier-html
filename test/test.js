var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("html minify plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-postcompile-complete", function *() {
            true.should.be.true;
        });

        co(function *() {
            yield thoughtpad.notify("html-postcompile-request", { contents: "2" });
        })();
    });

    it("should ignore requests with no content", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-postcompile-complete", function *() {
            true.should.be.false;
        });

        co(function *() {
            yield thoughtpad.notify("html-postcompile-request", { contents: "" });
        })();
    });

    it("should minify html from string", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-postcompile-complete", function *(contents) {
            contents.should.equal('<body><p>Hello there</p></body>');
        });

        co(function *() {
            yield thoughtpad.notify("html-postcompile-request", { contents: "<body>\n\t<p>Hello there</p> \n</body>", data: { collapseWhitespace: true } });
            done();
        })();
    });
});