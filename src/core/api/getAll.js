import {capitalize}	from "lodash";
import {sendSuccess} from "./jsend";

export default function getAll(req, res, next) {
	// Get the model
	const model = this.model(capitalize(req.params.type));

	// Check to see that the model type requested, exists
	if (!model) {
		const error = new Error("Specified type doesn't exist");
		error.statusCode = 400;
		return next(error);
	}

	model.find().exec()
	.then(function(models) {
		sendSuccess(res, models);
	})
	.catch(function(err) {
		return next(err);
	});
}