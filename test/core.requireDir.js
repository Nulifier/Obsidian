"use strict";

var Obsidian	= require("../lib/obsidian");
var path		= require("path");

describe("core.requireDir", function() {
	it("should exist", function() {
		Obsidian.should.respondTo("requireDir");
	});

	it("should require files in a directory", function() {
		var obsidian = new Obsidian();

		var reqs = obsidian.requireDir(__dirname, "../lib/core");
		reqs.should.include.keys("requireDir", "options");
		reqs.requireDir.should.be.a("function");
	});

	it("should accept a customizer", function() {
		var obsidian = new Obsidian();

		var calledWithPath = false;

		obsidian.requireDir(__dirname, "../lib/core", function(fullPath) {
			if (path.basename(fullPath) === "requireDir.js") {
				calledWithPath = true;
			}
		});

		calledWithPath.should.be.true;
	});

	it("should not require files that aren't requireable", function() {
		var obsidian = new Obsidian();

		var reqs = obsidian.requireDir(__dirname, "../test");
		reqs.should.not.include.keys(".eslintrc");
	});
});
