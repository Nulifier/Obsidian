"use strict";var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 







init;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);var _express = require("express");var _express2 = _interopRequireDefault(_express);var _initDb = require("./initDb");var _initDb2 = _interopRequireDefault(_initDb);var _expressHandlebars = require("express-handlebars");var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);var _helpers = require("../helpers");var obsidianHelpers = _interopRequireWildcard(_helpers);function init(options) {var _this = this;
	this.options(options);

	this.log.info("Obsidian initalizing");

	// Create the express app
	if (!this.app) {
		this.set("app", (0, _express2["default"])());}


	// Build the partials
	var partialsDir = [
	{ namespace: "obsidian", dir: _path2["default"].join(__dirname, "../templates/partials") }].
	concat(this.get("partials") || []);

	var helpers = _Object$assign({}, 
	obsidianHelpers, 
	this.get("helpers"));

	// Register the handlebars view engine
	var handlebars = _expressHandlebars2["default"].create({ 
		layoutsDir: this.get("layouts"), 
		partialsDir: partialsDir, 
		defaultLayout: this.get("default layout"), 
		helpers: helpers });


	this.app.engine("handlebars", handlebars.engine);

	// Setup the configuration
	this.app.set("views", this.get("views"));
	this.app.set("view engine", this.get("view engine"));

	// Apply application locals
	if (_lodash2["default"].isPlainObject(this.get("locals"))) {
		_Object$assign(this.app.locals, this.get("locals"));}

	this.app.locals.data = { 
		"googleAnalytics": this.get("googleAnalytics") };


	// Prettify json and html
	if (this.get("env") !== "production") {
		this.app.set("json spaces", 2);
		this.app.locals.pretty = true;}


	// Initialize the database
	_initDb2["default"].call(this);

	// Middleware
	[
	// Obsidian Middleware
	"obsidian", // This must go first in case we run into any errors in the other middleware

	// Logging
	"log", 

	// Not smart middleware
	"compression", 
	"static", 
	"static-admin", 
	"body-parser"].
	forEach(function (middleware) {
		require(_path2["default"].join("..", "middleware", middleware)).call(_this);});


	// Load the admin ui route
	if (this.get("admin ui")) {
		require("../routes/admin")(this.app);}


	// Load the API routes
	require("./api").call(this);

	// Load the application routes
	if (_lodash2["default"].isFunction(this.get("routes"))) {
		this.get("routes")(this.app);} else 

	if (this.get("routes")) {
		throw new Error("Routes must be provided in a function");}


	// TODO: Add redirects

	// Load the error handlers
	this.app.use(require("../routes/404"));
	this.app.use(require("../routes/500"));

	return this;}module.exports = exports["default"];