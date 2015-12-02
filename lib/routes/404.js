"use strict";var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 


err404;var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);var _default = require("./404-default");var _default2 = _interopRequireDefault(_default);function err404(req, res, next) {
	// Check if the application has provided a 404 handler
	var app404 = res.locals.obsidian.get("404");

	if (app404) {
		try {
			if (_lodash2["default"].isFunction(app404)) {
				// Call the route function
				return app404(req, res, next);} else 

			if (_lodash2["default"].isString(app404)) {
				// Render the specified view
				return res.status(404).render(app404);}} 


		catch (err) {
			return next(err);}}



	// There was no handler
	(0, _default2["default"])(req, res, next);}module.exports = exports["default"];