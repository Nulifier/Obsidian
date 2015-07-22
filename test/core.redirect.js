"use strict";

var Obsidian	= require("../lib/obsidian");

describe("redirect", function() {
	it("should have a redirect function", function() {
		Obsidian.should.respondTo("redirect");
	});

	describe(".redirect(from, to)", function() {
		it("should add the redirect", function() {
			var obsidian = new Obsidian;

			obsidian._redirects.should.be.empty;
			obsidian.redirect("/initial-path", "/new-path");
			obsidian._redirects.should.have.property("/initial-path", "/new-path");
		});

		it("should do nothing with an invalid parameter", function() {
			var obsidian = new Obsidian;

			obsidian._redirects.should.be.empty;
			obsidian.redirect();	// No params
			obsidian.redirect(function() {});
			obsidian.redirect(1, 2);
			obsidian._redirects.should.be.empty;
		});
	});

	describe(".redirect(paths)", function() {
		it("should add multiple redirects", function() {
			var obsidian = new Obsidian;

			obsidian._redirects.should.be.empty;
			obsidian.redirect({
				"/initial-path": "/new-path",
				"/old-path": "/cool-path"
			});
			obsidian._redirects.should.have.property("/initial-path", "/new-path");
			obsidian._redirects.should.have.property("/old-path", "/cool-path");
		});
	});
});
