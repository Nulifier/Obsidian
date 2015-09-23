"use strict";

var knex		= require("knex");
var bookshelf	= require("bookshelf");

function initDb() {
	var databaseConfig = this.get("database");

	// Create the database connection
	if (!this.knex) {
		this.knex = knex(databaseConfig);
	}

	if (!this.bookshelf) {
		this.bookshelf = bookshelf(this.knex);
		this.bookshelf.plugin("registry");
		this.bookshelf.plugin("visibility");
	}

	// Load obsidian's models
	require("../models/model")(this);
	require("../models/user")(this);
}

module.exports = initDb;
