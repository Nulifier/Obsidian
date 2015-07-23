"use strict";

var _			= require("lodash");
var Obsidian	= require("../lib/obsidian");

describe("options", function() {
	describe(".set(key, value)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("set");
		});

		it("should set the option to the value", function() {
			var obsidian = new Obsidian();

			obsidian._options.should.not.have.property("test-asdf-prop");
			obsidian.set("test-asdf-prop", "a value");
			obsidian._options.should.have.property("test-asdf-prop", "a value");
		});

		it("should return this", function() {
			var obsidian = new Obsidian();

			var retValue = obsidian.set("a", "b");
			retValue.should.equal(obsidian);
		});

		it("should set this.app when the key is app", function() {
			var obsidian = new Obsidian();

			obsidian.set("app", "unique string");
			obsidian.app.should.equal("unique string");
		});
	});

	describe(".get(key)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("get");
		});

		it("should return the option", function() {
			var obsidian = new Obsidian();

			obsidian._options["test-asdf-prop"] = "a value";
			var opt = obsidian.get("test-asdf-prop");
			opt.should.equal("a value");
		});

		it("should return undefined for unset options", function() {
			var obsidian = new Obsidian();

			obsidian._options.should.not.have.property("test-asdf-prop");
			var opt = obsidian.get("test-asdf-prop");
			should.not.exist(opt);
		});
	});

	describe(".enable(key)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("enable");
		});

		it("should set the option to true", function() {
			var obsidian = new Obsidian();

			obsidian._options.should.not.have.property("test-asdf-prop");
			obsidian.enable("test-asdf-prop");
			obsidian._options.should.have.property("test-asdf-prop", true);
		});

		it("should return this", function() {
			var obsidian = new Obsidian();

			var retValue = obsidian.enable("a");
			retValue.should.equal(obsidian);
		});
	});

	describe(".disable(key)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("disable");
		});

		it("should set the option to false", function() {
			var obsidian = new Obsidian();

			obsidian._options.should.not.have.property("test-asdf-prop");
			obsidian.disable("test-asdf-prop");
			obsidian._options.should.have.property("test-asdf-prop", false);
		});

		it("should return this", function() {
			var obsidian = new Obsidian();

			var retValue = obsidian.disable("a");
			retValue.should.equal(obsidian);
		});
	});

	describe(".enabled(key)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("enabled");
		});

		it("should return true if the option is enabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", true);
			obsidian.enabled("a").should.be.true;
		});

		it("should return false if the options is disabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", false);
			obsidian.enabled("a").should.be.false;
		});

		it("should interpret a \"truthy\" value as enabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", "test");
			obsidian.enabled("a").should.be.true;
		});

		it("should interpret a \"falsy\" value as disabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", NaN);
			obsidian.enabled("a").should.be.false;
		});
	});

	describe(".disabled(key)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("disabled");
		});

		it("should return false if the option is enabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", true);
			obsidian.disabled("a").should.be.false;
		});

		it("should return true if the options is disabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", false);
			obsidian.disabled("a").should.be.true;
		});

		it("should interpret a \"truthy\" value as enabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", []);
			obsidian.disabled("a").should.be.false;
		});

		it("should interpret a \"falsy\" value as disabled", function() {
			var obsidian = new Obsidian();
			obsidian.set("a", "");
			obsidian.disabled("a").should.be.true;
		});
	});

	describe(".options(opts)", function() {
		it("should exist", function() {
			Obsidian.should.respondTo("options");
		});

		it("should set multiple options", function() {
			var obsidian = new Obsidian();
			obsidian.options({
				a: "doe rei mei",
				b: 47
			});
			obsidian.get("a").should.equal("doe rei mei");
			obsidian.get("b").should.equal(47);
		});

		it("should return all the options if opts is not provided", function() {
			var obsidian = new Obsidian();
			var opts = obsidian.options();
			obsidian._options.should.equal(opts);
		});

		it("should do nothing if opts is not a plain object", function() {
			var obsidian = new Obsidian();
			var oldOpts = _.clone(obsidian._options);

			obsidian.options([1, 2, 3]);
			obsidian.options(new Obsidian());

			obsidian._options.should.deep.equal(oldOpts);
		});

		it("should return this if opts is provided", function() {
			var obsidian = new Obsidian();
			var ret = obsidian.options({});
			ret.should.equal(obsidian);
		});
	});
});
