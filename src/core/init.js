import path					from "path";
import _					from "lodash";
import express				from "express";
import initDb				from "./initDb";
import expressHandlebars	from "express-handlebars";

import * as obsidianHelpers	from "../helpers";

export default function init(options) {
	this.options(options);

	this.log.info("Obsidian initalizing");

	// Create the express app
	if (!this.app) {
		this.set("app", express());
	}

	// Build the partials
	const partialsDir = [
		{namespace: "obsidian", dir: path.join(__dirname, "../templates/partials")}
	].concat(this.get("partials") || []);

	const helpers = Object.assign({},
		obsidianHelpers,
		this.get("helpers"));

	// Register the handlebars view engine
	const handlebars = expressHandlebars.create({
		layoutsDir: this.get("layouts"),
		partialsDir: partialsDir,
		defaultLayout: this.get("default layout"),
		helpers: helpers
	});

	this.app.engine("handlebars", handlebars.engine);

	// Setup the configuration
	this.app.set("views", this.get("views"));
	this.app.set("view engine", this.get("view engine"));

	// Apply application locals
	if (_.isPlainObject(this.get("locals"))) {
		Object.assign(this.app.locals, this.get("locals"));
	}
	this.app.locals.data = {
		"googleAnalytics": this.get("googleAnalytics")
	};

	// Prettify json and html
	if (this.get("env") !== "production") {
		this.app.set("json spaces", 2);
		this.app.locals.pretty = true;
	}

	// Initialize the database
	initDb.call(this);

	// Middleware
	[
		// Obsidian Middleware
		"obsidian",	// This must go first in case we run into any errors in the other middleware

		// Logging
		"log",

		// Not smart middleware
		"compression",
		"static",
		"static-admin",
		"body-parser"
	].forEach((middleware) => {
		require(path.join("..", "middleware", middleware)).call(this);
	});

	// Load the admin ui route
	if (this.get("admin ui")) {
		require("../routes/admin")(this.app);
	}

	// Load the API routes
	require("./api").call(this);

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