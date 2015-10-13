"use strict";

var _		= require("lodash");

module.exports = {
	// Checks if a parameter passed to a handlebars helper is undefined.
	isUndefined: function(value) {
		return _.isUndefined(value) || (value.hash != null);
	}
}