"use strict";var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];Object.defineProperty(exports, "__esModule", { value: true });var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);var _express = require(
"express");var _express2 = _interopRequireDefault(_express);var _packageJson = require(
"../package.json");

/* eslint no-process-env: 0 */var 

Obsidian = 
function Obsidian() {_classCallCheck(this, Obsidian);
			this.lists = {};
			this.fields = {};
			this._options = {};
			this._redirects = {};
			this.express = _express2["default"];

			// Set default options
			this.options({ 
						env: process.env.NODE_ENV || /* istanbul ignore next */"development", 

						// Project Configuration
						views: "/templates/views", 
						"view engine": "handlebars", 

						// Admin UI
						"admin ui": true, 

						// Connection Details
						port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000, 
						host: process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || process.env.IP, 

						// Middleware Configuration
						compress: true });


			this.version = _packageJson.version;};exports["default"] = Obsidian;



_lodash2["default"].extend(Obsidian.prototype, require("./core/options"));

// Functions
// Lifecycle
Obsidian.prototype.init = require("./core/init");
Obsidian.prototype.start = require("./core/start");

// Config
Obsidian.prototype.redirect = require("./core/redirect");

// Logging
Obsidian.prototype.logs = require("./core/logs")();
Obsidian.prototype.log = Obsidian.prototype.logs["default"];

// Utils
Obsidian.prototype.forDirectory = require("./core/forDirectory");module.exports = exports["default"];