"use strict";

var _		= require("lodash");

var helpers = {};

_.assign(helpers,
	require("./dates"),
	require("./math"));

module.exports = helpers;