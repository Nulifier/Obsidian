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
		filename: "[name].js",
		pathinfo: true
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?-blacklist"},
			{test: /\.css$/, loader: "style-loader!css-loader"},
			{test: /\.less$/, loader: "style!css!less"}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "'development'"
		})
	],
	debug: true,
	devtool: "source-map"
};
