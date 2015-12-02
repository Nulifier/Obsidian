var Promise	= require("bluebird");
var fs		= Promise.promisifyAll(require("fs"));
var path	= require("path");
var gulp	= require("gulp");
var gutil	= require("gulp-util");

gulp.task("default", [
	"webpack",
	"less"
]);

/////////////////////////////////////////////////////////////////////
var webpack			= require("webpack");
var WEBPACK_DEV		= require("./admin/webpack.config");
var WEBPACK_PROD	= require("./admin/webpack-prod.config");

function gulpTaskWebpack(name, config) {
	gulp.task(name, function (callback) {
		webpack(config, function(err, stats) {
			if (err) throw new gutil.PluginError(name, err);
			gutil.log("[" + name + "]", stats.toString({
				colors: true
			}));
			callback();
		});
	});
}

gulp.task("webpack", ["webpack:dev", "webpack:prod"]);

gulpTaskWebpack("webpack:dev", WEBPACK_DEV);
gulpTaskWebpack("webpack:prod", WEBPACK_PROD);

/////////////////////////////////////////////////////////////////////
var less				= require("less");
var LessPluginCleanCSS	= require("less-plugin-clean-css");
var LESS_INPUT			= "./lib/admin/src/styles/styles.less";
var LESS_OUTPUT			= "./lib/admin/static/styles/styles";

function gulpTaskLess(mode) {
	var prod = mode === "prod";
	var outputFilename = (prod ? LESS_OUTPUT + ".min" : LESS_OUTPUT) + ".css";
	gulp.task("less:" + mode, function (callback) {
		fs.readFileAsync(LESS_INPUT, "utf8")
		.then(function (data) {
			return less.render(data, {
				paths: [
					"./lib/admin/src/styles",
					"./node_modules"
				],
				plugins:	prod ? [new LessPluginCleanCSS({advanced: true})] : [],
				sourceMap:	{}
			});
		})
		.then(function (output) {
			return Promise.join(
				fs.writeFileAsync(outputFilename, output.css, "utf8"),
				fs.writeFileAsync(outputFilename + ".map", output.map, "utf8"));
		})
		.then(function () {
			callback();
		})
		.catch(function (err) {
			throw new gutil.PluginError("less:" + mode, err);
		});
	});
}

gulp.task("less", ["less:dev", "less:prod"]);

gulpTaskLess("dev");
gulpTaskLess("prod");

/////////////////////////////////////////////////////////////////////
var Mocha		= require("mocha");
var TEST_DIR	= "./test/";

gulp.task("test", function (callback) {
	var mocha = new Mocha({
		reporter: "spec"
	});

	require("./test/support/env");

	fs.readdirAsync(TEST_DIR)
	.then(function (files) {
		files.filter(function (filename) {
			return filename.search(/\.js$/) != -1;
		}).forEach(function (file) {
			mocha.addFile(
				path.join(TEST_DIR, file)
			);
		});

		return new Promise(function (resolve, reject) {
			mocha.run(function (failures) {
				if (failures) {
					reject();
				}
				resolve();
			});
		});
	})
	.then(function () {
		callback();
		process.exit();
	})
	.catch(function (err) {
		throw new gutil.PluginError("test", err);
	});
});
