import _			from "lodash";
import express		from "express";
import {version}	from "../package.json";

/* eslint no-process-env: 0 */

export default class Obsidian {
	constructor() {
		this.lists = {};
		this.fields = {};
		this._options = {};
		this._redirects = {};
		this.express = express;

		// Set default options
		this.options({
			env: process.env.NODE_ENV || /* istanbul ignore next */ "development",

			// Project Configuration
			views: "/templates/views",
			"view engine": "handlebars",

			// Admin UI
			"admin ui": true,

			// Connection Details
			port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
			host: process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || process.env.IP,

			// Middleware Configuration
			compress: true
		});

		this.version = version;
	}
}

_.extend(Obsidian.prototype, require("./core/options"));

// Functions
// Lifecycle
Obsidian.prototype.init					= require("./core/init");
Obsidian.prototype.start				= require("./core/start");

// Config
Obsidian.prototype.redirect				= require("./core/redirect");

// Logging
Obsidian.prototype.logs					= require("./core/logs")();
Obsidian.prototype.log					= Obsidian.prototype.logs.default;

// Utils
Obsidian.prototype.forDirectory			= require("./core/forDirectory");