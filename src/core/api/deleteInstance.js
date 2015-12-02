import {capitalize}	from "lodash";
import {sendSuccess} from "./jsend";

export default function deleteInstance(req, res, next) {
	const model = this.models[capitalize(req.params.type)];
	let error;

	// Check to see that the model type requested exists
	if (!model) {
		error = new Error("Specified type doesn't exist");
		error.statusCode = 400;
		return next(error);
	}

	// Delete the item
	model.findByIdAndRemove(req.params.id).exec()
	.then(function(instance) {
		sendSuccess(res, null);
	})
	.catch(function(err) {
		return next(err);
	});
}