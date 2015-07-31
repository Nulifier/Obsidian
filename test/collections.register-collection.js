"use strict";

var registerCollection	= require("../lib/collections/register-collection");

describe("models.registerCollection", function() {
	var fakeThis;

	beforeEach("create fake this", function() {
		fakeThis = {
			bookshelf: {
				collection: sinon.spy()
			},
			collections: {}
		};
	});

	it("should export a function", function() {
		registerCollection.should.be.a("function");
	});

	it("should throw an error in the name is not a string", function() {
		registerCollection.bind(fakeThis, 42, {}).should.throw(Error);
	});

	it("should throw an error if collection is not provided", function() {
		registerCollection.bind(fakeThis, "ValidName").should.throw(Error);
	});

	it("should register the collection with the bookshelf registry", function() {
		var collection = {type: "IsCollection"};
		registerCollection.call(fakeThis, "ValidName", collection);
		fakeThis.bookshelf.collection.should.be.calledWith("ValidName", collection);
	});

	it("should store the collection in the collections object", function() {
		var collection = {type: "IsCollection"};
		registerCollection.call(fakeThis, "ValidName", collection);
		fakeThis.collections.should.have.property("ValidName", collection);
	});
});
