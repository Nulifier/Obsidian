import {Router}	from "express";
import {sendSuccess, sendFail, sendError} from "./jsend";

// Handlers
import describeApi		from "./describeApi";
import getAll			from "./getAll";
import getInstance		from "./getInstance";
import createInstance	from "./createInstance";
import updateInstance	from "./updateInstance";
import deleteInstance	from "./deleteInstance";

export default function setupApi() {
	// Create the router
	const router = Router();

	// Need a discovery path at /api/rest
	router.get("/rest", describeApi.bind(this));

	// Return all of a type of model
	router.get("/:type", getAll.bind(this));

	// Gets a specific instance of a model
	router.get("/:type/:id", getInstance.bind(this));

	// Creates a new instance of a model
	router.post("/:type", createInstance.bind(this));

	// Updates a specific instance of a model
	router.put("/:type/:id", updateInstance.bind(this));

	// Deletes the specified resouce
	router.delete("/:type/:id", deleteInstance.bind(this));

	// Add the router to the app
	this.app.use("/api", router);
}