"use strict";

var _	= require("lodash");

function registerModel(name, model) {
	if (!_.isString(name)) {
		throw new Error("The model's name must be a string");
	}

	if (!model) {
		throw new Error("A model must be provided");
	}

	this.bookshelf.model(name, model);
	this.models[name] = model;
}

module.exports = registerModel;
