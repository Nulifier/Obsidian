"use strict";

var path			= require("path");
var webpack			= require("webpack");
var AssetsPlugin	= require("assets-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: {
		"admin-app": "./src/scripts/admin-app.js"
	},
	output: {
		path: path.join(__dirname, "static/scripts"),
		filename: "[name]-[chunkhash].min.js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.css$/, loader: "style-loader!css-loader"},
			{test: /\.less$/, loader: "style!css!less"}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
		}),
		new AssetsPlugin({
			path: path.join(__dirname)
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin()
	],
	devtool: "source-map"
};
