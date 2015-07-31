"use strict";

var _		= require("lodash");

function registerCollection(name, collection) {
	if (!_.isString(name)) {
		throw new Error("The collection's name must be a string");
	}

	if (!collection) {
		throw new Error("A collection must be provided");
	}

	this.bookshelf.collection(name, collection);
	this.collections[name] = collection;
}

module.exports = registerCollection;
