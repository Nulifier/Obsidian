"use strict";

var bodyParser	= require("body-parser");

module.exports = function() {
	this.app.use(bodyParser.json());
	this.app.use(bodyParser.urlencoded({extended: true}));
};
