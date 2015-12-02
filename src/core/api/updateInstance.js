import {capitalize, clone}	from "lodash";
import {sendSuccess} 		from "./jsend";

export default function updateInstance(req, res, next) {
	const model = this.models[capitalize(req.params.type)];

	// Check to see that the model type requested exists
	if (!model) {
		const error = new Error("Specified type doesn't exist");
		error.statusCode = 400;
		return next(error);
	}

	// Get the item
	model.findById(req.params.id).exec()
	.then(function(instance) {
		// Save the instance
		const newInst = clone(req.body);
		delete newInst.id;

		Object.assign(instance, newInst);

		return instance.save();
	})
	.then(function(instance) {
		// Respond with the updated instance
		sendSuccess(res, instance);
	})
	.catch(function(err) {
		return next(err);
	});
}