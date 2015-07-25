"use strict";

var compression	= require("compression");

module.exports = function() {
	if (this.enabled("compress")) {
		this.app.use(compression());
	}
};
