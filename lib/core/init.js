"use strict";

var path		= require("path");
var _			= require("lodash");
var express		= require("express");
var initDb		= require("./initDb");

function init(options) {
	this.options(options);

	this.log.info("Obsidian initalizing");

	// Create the express app
	if (!this.app) {
		this.set("app", express());
	}

	// Setup the configuration
	this.app.set("views", this.get("views"));
	this.app.set("view engine", this.get("view engine"));

	// Apply application locals
	if (_.isPlainObject(this.get("locals"))) {
		_.assign(this.app.locals, this.get("locals"));
	}

	// Prettify json and html
	if (this.get("env") !== "production") {
		this.app.set("json spaces", 2);
		this.app.locals.pretty = true;
	}

	// Initialize the database
	initDb.call(this);

	// Middleware
	_.forEach([
		// Obsidian Middleware
		"obsidian",	// This must go first in case we run into any errors in the other middleware

		// Logging
		"log",

		// Not smart middleware
		"compression",
		"static",
		"body-parser"
	], function(middleware) {
		require(path.join(__dirname, "middleware", middleware)).call(this);
	}, this);

	// Load the application routes
	if (_.isFunction(this.get("routes"))) {
		this.get("routes")(this.app);
	}
	else if (this.get("routes")) {
		throw new Error("Routes must be provided in a function");
	}

	// TODO: Add redirects

	// Load the error handlers
	this.app.use(require("../routes/404"));
	this.app.use(require("../routes/500"));

	return this;
}

module.exports = init;
