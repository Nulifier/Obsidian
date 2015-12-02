"use strict";

var path	= require("path");

function adminRoute(app) {
	app.get(/\/admin\/?.*/, function(req, res) {
		res.sendFile(path.join(__dirname, "..", "..", "admin", "routes", "admin.html"));
	});
}

module.exports = adminRoute;
