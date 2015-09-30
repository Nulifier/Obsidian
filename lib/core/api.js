"use strict";

var express		= require("express");
var _			= require("lodash");

// All went well
function sendSuccess(res, data) {
	return res.json({
		status: "success",
		data: data
	});
}

// The client screwed up
function sendFail(res, data) {
	return res.json({
		status: "fail",
	})
}

// There is a server error
function sendError(res, message, code, data) {
	return res.json({
		status: "error",
		message: message,
		code: code,
		data: data
	});
}

function setupApi() {
	var self = this;

	// Create the router
	var router = express.Router();

	// Need a discovery path at /api/rest
	router.get("/rest", function(req, res) {
		// Respond with all the content types and their editable fields
		var apiDesc = _.mapValues(self.models, function(model, modelName) {
			// Skip Model
			if (modelName === "Model") {
				return;
			}
			return model.getApiDescription();
		});

		sendSuccess(res, apiDesc);
	});

	// Return all of a type of model
	router.get("/:type", function(req, res, next) {
		// Get the model
		var model = self.models[_.capitalize(req.params.type)];

		// Check to see that the model type requested, exists
		if (!model) {
			var error = new Error("Specified type doesn't exist");
			error.statusCode = 400;
			return next(error);
		}

		model.fetchAll()
		.then(function(models) {
			sendSuccess(res, models.toJSON());
		})
		.catch(function(err) {
			return next(err);
		});
	});

	// Gets a specific instance of a model
	router.get("/:type/:id", function(req, res, next) {
		var model = self.models[_.capitalize(req.params.type)];
		var error;

		// Check to see that the model type requested exists
		if (!model) {
			error = new Error("Specified type doesn't exist");
			error.statusCode = 400;
			return next(error);
		}

		// Parse the id
		var id = parseInt(req.params.id);
		if (isNaN(id)) {
			error = new Error("Id must be an integer");
			error.statusCode = 400;
			return next(error);
		}

		model.forge({id: id})
		.fetch()
		.then(function(inst) {
			sendSuccess(res, inst.toJSON());
		})
		.catch(function(err) {
			return next(err);
		});
	});

	router.post("/:type", function(req, res, next) {
		var model = self.models[_.capitalize(req.params.type)];
		var error;

		// Check to see that the model type requested exists
		if (!model) {
			error = new Error("Specified type doesn't exist");
			error.statusCode = 400;
			return next(error);
		}

		console.log(req.body);

		// Create the post
		var newInst = _.clone(req.body);
		delete newInst.id;

		model.forge()
		.save(newInst, {method: "insert", require: true})
		.then(function(instance) {
			res.location("/api/" + req.params.type + "/" + instance.id); 
			sendSuccess(res, instance.toJSON());
		})
		.catch(function(err) {
			return next(err);
		});
	});

	// Updates a specific instance of a model
	router.put("/:type/:id", function(req, res, next) {
		var model = self.models[_.capitalize(req.params.type)];
		var error;

		// Check to see that the model type requested exists
		if (!model) {
			error = new Error("Specified type doesn't exist");
			error.statusCode = 400;
			return next(error);
		}

		// Parse the id
		var id = parseInt(req.params.id);
		if (isNaN(id)) {
			error = new Error("Id must be an integer");
			error.statusCode = 400;
			return next(error);
		}

		// Get the item
		model.forge({id: id})
		.fetch({require: true})
		.then(function(instance) {
			// Save the instance
			var newInst = _.clone(req.body);
			delete newInst.id;

			return instance.save(newInst, {patch: true, require: true, method: "update"});
		})
		.then(function(instance) {
			// Respond with the updated instance
			sendSuccess(res, instance.toJSON());
		})
		.catch(function(err) {
			return next(err);
		});
	});

	// Deletes the specified resouce
	router.delete("/:type/:id", function(req, res, next) {
		var model = self.models[_.capitalize(req.params.type)];
		var error;

		// Check to see that the model type requested exists
		if (!model) {
			error = new Error("Specified type doesn't exist");
			error.statusCode = 400;
			return next(error);
		}

		// Parse the id
		var id = parseInt(req.params.id);
		if (isNaN(id)) {
			error = new Error("Id must be an integer");
			error.statusCode = 400;
			return next(error);
		}

		// Delete the item
		model.forge({id: id})
		.destroy()
		.then(function(instance) {
			sendSuccess(res, null);
		})
		.catch(function(err) {
			return next(err);
		});
	});

	// Add the router to the app
	this.app.use("/api", router);
}

module.exports = setupApi;
