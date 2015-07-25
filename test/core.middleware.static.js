"use strict";

var staticMiddleware	= require("../lib/core/middleware/4-static");

describe("core.middleware.static", function() {
	var fakeThis;

	beforeEach("create fake this", function() {
		fakeThis = {
			get: sinon.stub(),
			app: {
				use: sinon.spy()
			},
			express: {
				static: sinon.spy()
			}
		};
		fakeThis.get.withArgs("static").returns("/a/path");
		fakeThis.get.withArgs("static options").returns({opt: 42});
	});

	it("should be a function", function() {
		staticMiddleware.should.be.a("function");
	});

	it("should only check the \"static\" and \"static options\" options", function() {
		staticMiddleware.call(fakeThis);
		fakeThis.get.withArgs("static").should.be.calledOnce;
		fakeThis.get.withArgs("static options").should.be.calledOnce;
		fakeThis.get.should.be.calledTwice;
	});

	it("should not use any middleware if static is not set", function() {
		fakeThis.get.withArgs("static").returns(false);
		staticMiddleware.call(fakeThis);
		fakeThis.app.use.should.not.be.called;
	});

	it("should only use one middleware if only one path is set", function() {
		staticMiddleware.call(fakeThis);
		fakeThis.app.use.should.be.calledOnce;
	});

	it("should use multiple middleware if multiple paths are set", function() {
		fakeThis.get.withArgs("static").returns(["a", "b"]);
		staticMiddleware.call(fakeThis);
		fakeThis.app.use.should.be.calledTwice;
	});

	it("should pass the path to the middleware", function() {
		staticMiddleware.call(fakeThis);
		fakeThis.express.static.args[0][0].should.equal("/a/path");
	});

	it("should pass the options to the middleware", function() {
		staticMiddleware.call(fakeThis);
		fakeThis.express.static.args[0][1].should.have.property("opt", 42);
	});
});
