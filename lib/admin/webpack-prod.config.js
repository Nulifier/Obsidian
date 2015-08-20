"use strict";

var path			= require("path");
var AssetsPlugin	= require("assets-webpack-plugin");

var config			= require("./webpack.config");

// Make sure there is a plugins array
if (!config.plugins) {
	config.plugins = [];
}

config.plugins.push(
	new AssetsPlugin({
		path: path.join(__dirname)
	})
);

module.exports = config;
