"use strict";

var Obsidian	= require("../lib/obsidian");

describe("options", function() {
	it("should have a set function", function() {
		Obsidian.should.respondTo("set");
	});

	it("should have a get function", function() {
		Obsidian.should.respondTo("get");
	});

	it("should have an enable function", function() {
		Obsidian.should.respondTo("enable");
	});

	it("should have a disable function", function() {
		Obsidian.should.respondTo("disable");
	});

	it("should have an enabled function", function() {
		Obsidian.should.respondTo("enabled");
	});

	it("should have a disabled function", function() {
		Obsidian.should.respondTo("disabled");
	});

	it("should have an options function", function() {
		Obsidian.should.respondTo("options");
	});
});
