"use strict";

var _			= require("lodash");
var knex		= require("knex");
var bookshelf	= require("bookshelf");

function initDb() {
	var databaseConfig = this.get("database");

	// Create the database connection
	if (!this.db) {
		this.knex = knex(databaseConfig);
		this.bookshelf = bookshelf(this.knex);
		this.bookshelf.plugin("registry");
		this.bookshelf.plugin("visibility");
	}

	// Load obsidian's models
	require("../models/model")(this);
	require("../models/user")(this);
	require("../collections/collection")(this);
	require("../collections/users")(this);
}

module.exports = initDb;
