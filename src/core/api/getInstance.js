import {capitalize}	from "lodash";
import {sendSuccess} from "./jsend";

export default function getInstance (req, res, next) {
	const model = this.model(capitalize(req.params.type));

	// Check to see that the model type requested exists
	if (!model) {
		const error = new Error("Specified type doesn't exist");
		error.statusCode = 400;
		return next(error);
	}

	model.findById(req.params.id).exec()
	.then(function(inst) {
		sendSuccess(res, inst);
	})
	.catch(function(err) {
		return next(err);
	});
}