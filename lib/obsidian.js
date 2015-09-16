"use strict";

var _			= require("lodash");
var express		= require("express");

/* eslint no-process-env: 0 */

var Obsidian = function() {
	this.models = {};
	this._options = {};
	this._redirects = {};
	this.express = express;

	// Set default options
	this.options({
		env: process.env.NODE_ENV || /* istanbul ignore next */ "development",

		// Project Configuration
		views: "/templates/views",
		"view engine": "jade",

		// Admin UI
		"admin ui": true,

		// Connection Details
		port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
		host: process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || process.env.IP,

		// Middleware Configuration
		compress: true
	});
};

_.extend(Obsidian.prototype, require("./core/options"));

// Functions
// Lifecycle
Obsidian.prototype.init					= require("./core/init");
Obsidian.prototype.start				= require("./core/start");

// Config
Obsidian.prototype.redirect				= require("./core/redirect");

// Database
Obsidian.prototype.registerModel		= require("./models/register-model");

// Logging
Obsidian.prototype.logs					= require("./core/logs")();
Obsidian.prototype.log					= Obsidian.prototype.logs.default;

// Utils
Obsidian.prototype.requireDir			= require("./core/requireDir");

// Properties
Obsidian.prototype.version				= require("../package.json").version;

module.exports = Obsidian;
