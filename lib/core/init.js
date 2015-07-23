"use strict";

var _			= require("lodash");
var express		= require("express");
var initDb		= require("./initDb");
var formatError	= require("../helpers/formatError");

function init(options) {
	this.options(options);

	var self = this;

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
	// Require all files in the middleware directory and call each of them using this
	this.requireDir(__dirname, "middleware", function(fullPath) {
		var middleware = require(fullPath);

		/* istanbul ignore if */
		if (!_.isFunction(middleware)) {
			throw new Error("Middleware loaders must be a function");
		}

		// Load the middleware
		middleware.call(self);
	}, true);

	// Load the application routes
	if (_.isFunction(this.get("routes"))) {
		this.get("routes")(this.app);
	}
	else if (this.get("routes")) {
		throw new Error("Routes must be provided in a function");
	}

	// TODO: Add redirects

	// Load the 404 not found handler
	var default404Handler = function(req, res) {
		res.sendStatus(404);
	};

	this.app.use(function(req, res, next) {
		// Check if the application has provided a 404 handler
		var err404 = self.get("404");

		if (err404) {
			try {
				if (_.isFunction(err404)) {
					// Call the route function
					err404(req, res, next);
					return;
				}
				else if (_.isString(err404)) {
					// Render the specified view
					res.status(404).render(err404);
					return;
				}
			}
			catch (err) {
				// TODO: Add logging of the error
				console.log("Error handling 404");
				console.log(err);
			}
		}

		// There was no handler
		default404Handler(req, res, next);
	});

	var default500Handler = function(err, req, res, next) {	// eslint-disable-line no-unused-vars
		var msg = "";

		if (self.get("env") === "development") {
			msg = err.stack || err;
		}

		res.status(500).send(formatError("Internal Server Error (500)", msg));
	};

	this.app.use(function(err, req, res, next) {
		// Check if the application provided a 500 handler
		var err500 = self.get("500");

		if (err500) {
			try {
				if (_.isFunction(err500)) {
					// Call the error handling route
					err500(err, req, res, next);
					return;
				}
				else if (_.isString(err500)) {
					// Render the error view
					res.status(500).render(err500, {err: err});
					return;
				}
			}
			catch (e) {
				// TODO: Add logging of the error
				console.log("Error handling 500");
				console.log(e);
			}
		}

		// There was no handler
		default500Handler(err, req, res, next);
	});

	return this;
}

module.exports = init;
