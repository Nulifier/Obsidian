"use strict";

var fields	= require("./basic-fields");

module.exports = fields.String.extend({
	validate: "isEmail"
});
