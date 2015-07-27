"use strict";

var err404		= require("../lib/routes/404");
var express		= require("express");

// Just a fake member function for use with sinon
function memberFunc() {
	return this;
}

describe("routes.404", function() {
	var req;
	var res;
	var next;

	beforeEach("create request and response", function() {
		req = {};
		res = {
			locals: {
				obsidian: {
					get: sinon.stub()
				}
			},
			status: sinon.spy(memberFunc),
			render: sinon.spy(memberFunc),
			sendStatus: sinon.spy(memberFunc)
		};
		next = sinon.spy();
	});

	it("should export a function", function() {
		err404.should.be.a("function");
	});

	it("should call the route function", function() {
		var routeHandler = sinon.spy();
		res.locals.obsidian.get.withArgs("404").returns(routeHandler);
		err404(req, res, next);
		routeHandler.should.be.called;
		next.should.not.be.called;
		res.status.should.not.be.called;
		res.render.should.not.be.called;
	});

	it("should render the specified view", function() {
		var routeView = "TestView";
		res.locals.obsidian.get.withArgs("404").returns(routeView);
		err404(req, res, next);
		next.should.not.be.called;
		res.status.should.be.calledWith(404);
		res.render.should.be.calledWith(routeView);
	});

	it("should call the next function with an error if there is one", function() {
		var routeHandler = function() {throw new Error("failed")};
		res.locals.obsidian.get.withArgs("404").returns(routeHandler);

		err404(req, res, next);

		next.should.be.called;
		next.firstCall.args[0].should.be.a("Error");
	});

	it("should call the default 404 handler if none is given", function() {
		err404(req, res, next);
		res.sendStatus.should.be.calledWith(404);
	});

	it("should call the default 404 handler if an invalid handler is given", function() {
		res.locals.obsidian.get.withArgs("404").returns([]);
		err404(req, res, next);
		res.sendStatus.should.be.calledWith(404);
	});
});
