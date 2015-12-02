import _			from "lodash";
import default500	from "./500-default";

export default function err500(err, req, res, next) {
	// Check if the application provided a 500 handler
	var app500 = res.locals.obsidian.get("500");

	if (app500) {
		try {
			if (_.isFunction(app500)) {
				// Call the error handling route
				return app500(err, req, res, next);
			}
			else if (_.isString(app500)) {
				// Render the error view
				return res.status(500).render(app500, {err: err});
			}
		}
		catch (err) {
			res.locals.obsidian.log.error(err, "Error handling 500");
			return res.sendStatus(500);
		}
	}

	// There was no handler
	default500(err, req, res, next);
}