"use strict";

var formatError		= require("../lib/helpers/formatError");

describe("helpers.formatError", function() {
	it("should be a function", function() {
		formatError.should.be.a("function");
	});

	it("should respond with a string", function() {
		var ret = formatError("An Error");
		ret.should.be.a("string");
	});

	it("should include the title", function() {
		var title = "Totally random string";
		var ret = formatError(title);
		ret.should.contain(title);
	});

	it("should include the message", function() {
		var msg = "This is the descriptive error message";
		var ret = formatError("An Error", msg);
		ret.should.contain(msg);
	});

	it("should have a blank msg when not provided", function() {
		var ret = formatError("An Error");
		ret.should.contain("<pre></pre>");
	});
});
