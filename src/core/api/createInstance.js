import {capitalize, clone}	from "lodash";
import {sendSuccess} 		from "./jsend";

export default function createInstance(req, res, next) {
	const model = this.models[capitalize(req.params.type)];

	// Check to see that the model type requested exists
	if (!model) {
		const error = new Error("Specified type doesn't exist");
		error.statusCode = 400;
		return next(error);
	}

	// Create the post
	const newInst = clone(req.body);
	delete newInst._id;

	model.create(newInst)
	.then(function(instance) {
		res.location("/api/" + req.params.type + "/" + instance._id); 
		sendSuccess(res, instance);
	})
	.catch(function(err) {
		return next(err);
	});
}