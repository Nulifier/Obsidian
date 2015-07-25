"use strict";

var _		= require("lodash");

function err500(err, req, res, next) {
	// Check if the application provided a 500 handler
	var app500 = res.locals.obsidian.get("500");

	if (app500) {
		try {
			if (_.isFunction(app500)) {
				// Call the error handling route
				app500(err, req, res, next);
				return;
			}
			else if (_.isString(app500)) {
				// Render the error view
				res.status(500).render(app500, {err: err});
				return;
			}
		}
		catch (e) {
			// TODO: Add logging of the error
			console.log("Error handling 500");
			console.log(e);
		}
	}

	// There was no handler
	require("../helpers/default500Handler")(err, req, res, next);
}

module.exports = err500;
