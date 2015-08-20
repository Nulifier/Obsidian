"use strict";

var path	= require("path");
var _		= require("lodash");

module.exports = function() {
	if (this.get("admin ui")) {
		this.app.use(this.express.static(path.join(__dirname, "../../admin/static")));
	}
};
