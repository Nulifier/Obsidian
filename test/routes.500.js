"use strict";

var err500	= require("../lib/routes/500");

// Just a fake member function for use with sinon
function memberFunc() {
	return this;
}

describe("routes.500", function() {
	var err;
	var req;
	var res;
	var next;

	beforeEach("create request and response", function() {
		err = new Error("This is an error");
		req = {};
		res = {
			locals: {
				obsidian: {
					get: sinon.stub(),
					log: {error: function() {}}
				}
			},
			status: sinon.spy(memberFunc),
			render: sinon.spy(memberFunc),
			sendStatus: sinon.spy(memberFunc),
			send: sinon.spy(memberFunc)
		};
		next = sinon.spy();
	});

	it("should export a function", function() {
		err500.should.be.a("function");
	});

	it("should call the route function", function() {
		var routeHandler = sinon.spy();
		res.locals.obsidian.get.withArgs("500").returns(routeHandler);
		err500(err, req, res, next);
		routeHandler.should.be.callled;
		next.should.not.be.called;
		res.status.should.not.be.called;
		res.render.should.not.be.called;
	});

	it("should render the specified view", function() {
		var routeView = "TestView";
		res.locals.obsidian.get.withArgs("500").returns(routeView);
		err500(err, req, res, next);
		next.should.not.be.called;
		res.status.should.be.calledWith(500);
		res.render.should.be.calledWith(routeView);
	});

	it("should send the 500 status if there is an error", function() {
		var routeHandler = function() {throw new Error("failed"); };
		res.locals.obsidian.get.withArgs("500").returns(routeHandler);
		err500(err, req, res, next);
		next.should.not.be.called;
		res.sendStatus.should.be.calledWith(500);
	});

	it("should call the default 500 handler if none is given", function() {
		err500(err, req, res, next);
		next.should.not.be.called;
		res.status.should.be.calledWith(500);
		res.send.should.be.called;
	});

	it("should call the default 500 handler if an invalid handler is given", function() {
		res.locals.obsidian.get.withArgs("500").returns([]);
		err500(err, req, res, next);
		next.should.not.be.called;
		res.status.should.be.calledWith(500);
		res.send.should.be.called;
	});
});
