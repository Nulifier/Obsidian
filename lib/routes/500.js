"use strict";var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 


err500;var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);var _default = require("./500-default");var _default2 = _interopRequireDefault(_default);function err500(err, req, res, next) {
	// Check if the application provided a 500 handler
	var app500 = res.locals.obsidian.get("500");

	if (app500) {
		try {
			if (_lodash2["default"].isFunction(app500)) {
				// Call the error handling route
				return app500(err, req, res, next);} else 

			if (_lodash2["default"].isString(app500)) {
				// Render the error view
				return res.status(500).render(app500, { err: err });}} 


		catch (err) {
			res.locals.obsidian.log.error(err, "Error handling 500");
			return res.sendStatus(500);}}



	// There was no handler
	(0, _default2["default"])(err, req, res, next);}module.exports = exports["default"];