"use strict";

var _		= require("lodash");

function defineModel(config) {
	if (!_.isPlainObject(config)) {
		throw new Error("The config parameter must be a hash");
	}

	var name = config.name;
	var attributes = config.attributes;
	var options = _.omit(config, ["name", "attributes"]);

	// Do some error checking

	// It must have a name
	if (!_.isString(config.name)) {
		throw new Error("The model must have a name");
	}

	// Attributes must be a hash
	if (!_.isPlainObject(config.attributes)) {
		throw new Error("The model's attributes must be defined in a hash");
	}

	return function(sequelize) {
		return sequelize.define(name, attributes, options);
	};
}

module.exports = defineModel;
