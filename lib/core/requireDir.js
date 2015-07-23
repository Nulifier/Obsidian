"use strict";

/* eslint no-sync: 0 */

var _		= require("lodash");
var fs		= require("fs");
var path	= require("path");

// Requires all files in a specified path
// Customizer can be a function that is called instead of require
//	- customizer(fullPath)
function requireDir(rel, initialFrom, func, ordered) {
	var customizer = func;

	if (!_.isFunction(customizer)) {
		customizer = function(fullPath) {
			return require(fullPath);
		};
	}

	function requireRecursive(from) {
		var required = {};

		// Get an absolute path
		var resolvedPath = path.resolve(rel, from);

		// Read all the files in that dir
		var paths = fs.readdirSync(resolvedPath);

		// Sort if needed
		if (ordered) {
			paths = _.sortBy(paths, function(name) {
				return path.basename(name);
			});
		}

		paths.forEach(function(name) {
			var fullPath = path.join(resolvedPath, name);

			// Check if the file is a directory
			var stats = fs.statSync(fullPath);
			if (stats.isDirectory()) {
				required[name] = requireRecursive(fullPath);
			}
			else {
				// Check if its a valid file to require
				var ext = path.extname(name);
				var base = path.basename(name, ext);
				if (require.extensions[ext]) {
					required[base] = customizer(fullPath);
				}
			}
		});

		return required;
	}

	return requireRecursive(initialFrom);
}

module.exports = requireDir;
