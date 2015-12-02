"use strict";var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 

logs;var _bunyan = require("bunyan");var _bunyan2 = _interopRequireDefault(_bunyan);function logs() {
	return { 
		"default": _bunyan2["default"].createLogger({ 
			name: "obsidian", 
			streams: [
			{ 
				stream: process.stdout, 
				level: "info" }, 

			{ 
				path: "./log.json", 
				level: "info" }], 


			serializers: _bunyan2["default"].stdSerializers }) };}module.exports = exports["default"];