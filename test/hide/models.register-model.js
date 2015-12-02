"use strict";

var registerModel	= require("../lib/models/register-model");

describe("models.registerModel", function() {
	var fakeThis;

	beforeEach("create fake this", function() {
		fakeThis = {
			bookshelf: {
				model: sinon.spy()
			},
			models: {}
		};
	});

	it("should export a function", function() {
		registerModel.should.be.a("function");
	});

	it("should throw an error in the name is not a string", function() {
		registerModel.bind(fakeThis, 42, {}).should.throw(Error);
	});

	it("should throw an error if model is not provided", function() {
		registerModel.bind(fakeThis, "ValidName").should.throw(Error);
	});

	it("should register the model with the bookshelf registry", function() {
		var model = {type: "IsModel"};
		registerModel.call(fakeThis, "ValidName", model);
		fakeThis.bookshelf.model.should.be.calledWith("ValidName", model);
	});

	it("should store the model in the models object", function() {
		var model = {type: "IsModel"};
		registerModel.call(fakeThis, "ValidName", model);
		fakeThis.models.should.have.property("ValidName", model);
	});
});
