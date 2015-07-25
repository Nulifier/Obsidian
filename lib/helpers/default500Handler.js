"use strict";

var formatError	= require("../helpers/formatError");

function default500Handler(err, req, res, next) {	// eslint-disable-line no-unused-vars
	var msg = "";

	if (res.locals.obsidian.get("env") === "development") {
		msg = err.stack || err;
	}

	res.status(500).send(formatError("Internal Server Error (500)", msg));
}

module.exports = default500Handler;
