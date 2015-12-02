import _			from "lodash";
import default404	from "./404-default";

export default function err404(req, res, next) {
	// Check if the application has provided a 404 handler
	var app404 = res.locals.obsidian.get("404");

	if (app404) {
		try {
			if (_.isFunction(app404)) {
				// Call the route function
				return app404(req, res, next);
			}
			else if (_.isString(app404)) {
				// Render the specified view
				return res.status(404).render(app404);
			}
		}
		catch (err) {
			return next(err);
		}
	}

	// There was no handler
	default404(req, res, next);
}
