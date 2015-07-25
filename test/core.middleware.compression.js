"use strict";

var compression	= require("../lib/core/middleware/compression");

describe("core.middleware.compression", function() {
	var fakeThis;

	beforeEach("create fake this", function() {
		fakeThis = {
			enabled: sinon.stub().withArgs("compress").returns(true),
			app: {
				use: sinon.spy()
			}
		};
	});

	it("should be a function", function() {
		compression.should.be.a("function");
	});

	it("should only check the compress option", function() {
		compression.call(fakeThis);
		fakeThis.enabled.should.be.calledOnce;
		fakeThis.enabled.should.be.calledWith("compress");
	});

	it("should use one middleware function if enabled", function() {
		compression.call(fakeThis);
		fakeThis.app.use.should.be.calledOnce;
		// express-compress returns an array of middleware
		fakeThis.app.use.args[0][0].should.be.a("function");
	});

	it("should not use any middleware if not enabled", function() {
		fakeThis.enabled = sinon.stub().withArgs("compress").returns(false);
		compression.call(fakeThis);
		fakeThis.app.use.should.not.be.called;
	});
});
