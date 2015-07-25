"use strict";

var _		= require("lodash");

module.exports = function() {
	var sassPaths = this.get("sass");
	var sassOptions = this.get("sass options") || {};

	// Convert lessPaths to an array if needed
	if (_.isString(sassPaths)) {
		sassPaths = [sassPaths];
	}

	if (_.isArray(sassPaths)) {
		var sassMiddleware;
		try {
			sassMiddleware = require("node-sass-middleware");
		}
		catch(err) {
			/* istanbul ignore next */
			if (err.code === "MODULE_NOT_FOUND") {
				// Maybe we're npm link'ed?
				try {
					var parentRequire = require("parent-require");
					sassMiddleware = parentRequire("node-sass-middleware");
				}
				catch (e) {
					if (e.code === "MODULE_NOT_FOUND") {
						throw new Error("ERROR: node-sass-middleware must be installed to use the \"sass\" option");
					}
					else {
						throw e;
					}
				}
			}
			else {
				throw err;
			}
		}

		_.forEach(sassPaths, function(sassPath) {
			this.app.use(sassMiddleware(_.assign({
				src: sassPath,
				dest: sassPath,
				outputStyle: this.get("env") === "production" ? "compressed" : "nested"
			}, sassOptions)));
		}, this);
	}
};
