"use strict";

var bodyParser	= require("../lib/core/middleware/5-bodyParser");

describe("core.middleware.bodyParser", function() {
	it("should export a function", function() {
		bodyParser.should.be.a("function");
	});

	it("should use two middleware functions", function() {
		var fakeThis = {
			app: {
				use: sinon.spy()
			}
		};

		bodyParser.call(fakeThis);

		var spy = fakeThis.app.use;
		spy.should.be.calledTwice;
		spy.getCall(0).args[0].should.be.a("function");
		spy.getCall(1).args[0].should.be.a("function");
	});
});
