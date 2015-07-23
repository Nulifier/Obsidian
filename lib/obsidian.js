"use strict";

var _			= require("lodash");

/* eslint no-process-env: 0 */

var Obsidian = function() {
	this._options = {};
	this._redirects = {};

	// Set default options
	this.options({
		env: process.env.NODE_ENV || /* istanbul ignore next */ "development",

		// Project Configuration
		views: "/templates/views",
		"view engine": "jade",

		// Connection Details
		port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
		host: process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || process.env.IP,

		// Middleware Configuration
		compress: true
	});
};

_.extend(Obsidian.prototype, require("./core/options"));

// Functions
Obsidian.prototype.init		= require("./core/init");
Obsidian.prototype.start	= require("./core/start");
Obsidian.prototype.redirect	= require("./core/redirect");

// Properties
Obsidian.prototype.version = require("../package.json").version;

module.exports = Obsidian;
