"use strict";

var _		= require("lodash");

function err404(req, res, next) {
	// Check if the application has provided a 404 handler
	var app404 = res.locals.obsidian.get("404");

	if (app404) {
		try {
			if (_.isFunction(app404)) {
				// Call the route function
				app404(req, res, next);
				return;
			}
			else if (_.isString(app404)) {
				// Render the specified view
				res.status(404).render(app404);
				return;
			}
		}
		catch (err) {
			// TODO: Add logging of the error
			console.log("Error handling 404");
			console.log(err);
		}
	}

	// There was no handler
	require("../helpers/default404Handler")(req, res, next);
}

module.exports = err404;
