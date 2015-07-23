"use strict";

function model(modelName) {
	var ret = this._models[modelName];

	if (!ret) {
		throw new Error("Unknown model name requested: " + modelName);
	}

	return ret;
}

module.exports = model;
