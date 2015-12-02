"use strict";

var forDirectory	= require("../lib/core/forDirectory");
var path			= require("path");

describe("core.forDirectory", function() {
	it("should export a function", function() {
		forDirectory.should.be.an("function");
	});

	it("should call func for each file in a directory", function() {
		var callback = sinon.spy();

		return forDirectory("test/test-data/*.js", {}, callback)
		.then(function() {
			callback.should.be.calledOnce;
			callback.should.be.calledWith(path.resolve("test/test-data/test-file.js"));
		});
	});

	it("should recurse into folders", function() {
		var callback = sinon.spy();

		return forDirectory("test/test-data/**/*.js", {}, callback)
		.then(function() {
			callback.should.be.calledTwice;
			callback.should.be.calledWith(path.resolve("test/test-data/test-file.js"));
			callback.should.be.calledWith(path.resolve("test/test-data/recursive/find-me.js"));
		});
	});

	it("should pass along options", function() {
		var callback = sinon.spy();

		return forDirectory("test-data/*.js", {
			cwd: __dirname
		}, callback)
		.then(function() {
			callback.should.be.calledOnce;
			callback.should.be.calledWith(path.resolve("test/test-data/test-file.js"));
		})
	});
});