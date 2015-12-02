"use strict";var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 

redirect;var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);function redirect(from, to) {
	if (_lodash2["default"].isPlainObject(from)) {
		_lodash2["default"].assign(this._redirects, from);} else 

	if (_lodash2["default"].isString(from) && _lodash2["default"].isString(to)) {
		this._redirects[from] = to;}


	return this;}module.exports = exports["default"];