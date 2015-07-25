"use strict";

var _	= require("lodash");

module.exports = function() {
	var staticPaths = this.get("static");
	var staticOptions = this.get("static options");

	// Convert staticPaths to array if needed
	if (_.isString(staticPaths)) {
		staticPaths = [staticPaths];
	}

	if (_.isArray(staticPaths)) {
		_.forEach(staticPaths, function(staticPath) {
			this.app.use(this.express.static(staticPath, staticOptions));
		}, this);
	}
};
