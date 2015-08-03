"use strict";

var knex		= require("knex");
var bookshelf	= require("bookshelf");
var Obsidian	= require("../lib/obsidian");
var initDb		= require("../lib/core/initDb");
var dbConfig	= require("./support/knexfile").test;

describe("core.initDb", function() {
	var obsidian;

	function createFakeObsidian() {
		obsidian = new Obsidian();
		sinon.stub(obsidian, "get").withArgs("database").returns(dbConfig);
	}

	it("should export a function", function() {
		initDb.should.be.a("function");
	});

	describe("no premade knex instance", function() {
		before("calling initDb", function() {
			createFakeObsidian();
			initDb.call(obsidian);
		});

		it("should get the database config from the key \"database\"", function() {
			obsidian.get.withArgs("database").should.be.calledOnce;
		});

		it("should have a knex instance", function() {
			obsidian.should.have.property("knex");
		});

		it("should have a bookshelf instance", function() {
			obsidian.should.have.property("bookshelf");
		});

		it("should load the registry plugin", function() {
			obsidian.bookshelf.should.have.property("registry");
		});

		it("should load the Model model", function() {
			obsidian.models.should.have.property("Model");
		});

		it("should load the User model", function() {
			obsidian.models.should.have.property("User");
		});

		it("should load the Collection collection", function() {
			obsidian.collections.should.have.property("Collection");
		});

		it("should load the Users collection", function() {
			obsidian.collections.should.have.property("Users");
		});
	});

	describe("premade knex instance", function() {
		var knexInstance;

		before("calling initDb", function() {
			createFakeObsidian();
			knexInstance = knex(dbConfig);
			obsidian.knex = knexInstance;
			initDb.call(obsidian);
		});

		it("should not have created its own knex instance", function() {
			obsidian.knex.should.equal(knexInstance);
		});

		it("should still have created bookshelf", function() {
			obsidian.should.have.property("bookshelf");
		});
	});

	describe("premade knex and bookshelf", function() {
		var knexInstance;
		var bookshelfInstance;

		before("calling initDb", function() {
			createFakeObsidian();

			// Create knex and bookshelf
			knexInstance = knex(dbConfig);
			bookshelfInstance = bookshelf(knexInstance);
			bookshelfInstance.plugin("registry");
			bookshelfInstance.plugin("visibility");

			// Load them into obsidian
			obsidian.knex = knexInstance;
			obsidian.bookshelf = bookshelfInstance;
			initDb.call(obsidian);
		});

		it("should not have created its own knex instance", function() {
			obsidian.knex.should.equal(knexInstance);
		});

		it("should not have created its own bookshelf instance", function() {
			obsidian.bookshelf.should.equal(bookshelfInstance);
		});
	});
});
