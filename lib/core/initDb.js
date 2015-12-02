"use strict";var _Promise = require("babel-runtime/core-js/promise")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 





initDb;var _mongoose = require("mongoose");var _path = require("path");var _path2 = _interopRequireDefault(_path);var _lodash = require("lodash");var _fieldsField = require("../fields/field");var _fieldsField2 = _interopRequireDefault(_fieldsField);var _listsList = require("../lists/list");var _listsList2 = _interopRequireDefault(_listsList);function initDb() {var _this = this;
	var databaseConfig = this.get("database");

	// Store the version of mongoose we are using
	this.mongoose = new _mongoose.Mongoose();
	this.mongoose.Promise = _Promise; // Mongoose is using non-standard promises

	this.Schema = this.mongoose.Schema;
	this.model = this.mongoose.model.bind(this.mongoose);

	var mongoUri = this.get("mongo");

	// Make sure the mongo URI exists or find an appropriate one from environmental variables
	// http://docs.mongodb.org/manual/reference/connection-string/
	// TODO Mongo URI

	if (!mongoUri) {
		throw new Error("The MongoDB URI must be set");}


	// Connect to the DB
	this.mongoose.connect(mongoUri);

	// Load the classes
	this.List = (0, _listsList2["default"])(this);
	this.Field = (0, _fieldsField2["default"])(this);
	var loadType = function loadType(typeName, func) {
		return _this.forDirectory("../" + (0, _lodash.kebabCase)(typeName) + "s/*.js", { cwd: __dirname }, function (file) {
			var name = (0, _lodash.capitalize)(_path2["default"].basename(file, ".js"));

			// Skip the base class file
			if (name === typeName) {
				return;}


			// Load the class
			var type = require(file)(_this);
			if (typeof func === "function") func(name, type);});};


	loadType("Field", function (name, field) {
		_this.fields[name] = field;}).
	then(function () {
		return loadType("List");})["catch"](

	function (err) {return _this.log.error(err);});}module.exports = exports["default"];