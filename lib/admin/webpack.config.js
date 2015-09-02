"use strict";

var path			= require("path");
var webpack			= require("webpack");

module.exports = {
	context: __dirname,
	entry: {
		"admin-app": "./src/scripts/admin-app.js"
	},
	output: {
		path: path.join(__dirname, "static/scripts"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			"fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"
		})
	]
};
