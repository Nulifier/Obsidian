"use strict";

var model	= require("../lib/core/model");

describe("core.model", function() {
	var fakeThis;

	before("create fake this", function() {
		fakeThis = {
			_models: {
				User: "user model",
				Comment: "comment model",
				Post: "post model"
			}
		};
	});

	it("should be a function", function() {
		model.should.be.a("function");
	});

	it("should return the requested model", function() {
		var ret = model.call(fakeThis, "User");
		ret.should.equal("user model");
	});

	it("should throw an error if the model name isn't found", function() {
		var threw = false;
		try {
			model.call(fakeThis, "InvalidModel");
		}
		catch(err) {
			err.should.be.a("Error");
			threw = true;
		}
		threw.should.be.true;
	});
});
