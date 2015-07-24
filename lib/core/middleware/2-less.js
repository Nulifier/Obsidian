"use strict";

var _		= require("lodash");

module.exports = function() {
	var lessPaths = this.get("less");
	var lessOptions = this.get("less options") || {};

	// Convert lessPaths to an array if needed
	if (_.isString(lessPaths)) {
		lessPaths = [lessPaths];
	}

	if (_.isArray(lessPaths)) {
		var lessMiddleware;
		try {
			lessMiddleware = require("less-middleware");
		}
		catch(err) {
			/* istanbul ignore next */
			if (err.code === "MODULE_NOT_FOUND") {
				throw new Error("less-middleware must be installed to use the \"less\" option");
			}
			else {
				throw err;
			}
		}

		_.forEach(lessPaths, function(lessPath) {
			this.app.use(lessMiddleware(lessPath, lessOptions));
		}, this);
	}
};
