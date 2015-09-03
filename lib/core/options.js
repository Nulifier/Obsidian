"use strict";

var _		= require("lodash");

/* List of options:
- env: The run mode of the server, development, production, test
- compress: Enables compression of all requests
- routes: A function that will register all the routes.
- err404: A function or template view that is rendered upon a 404 error.
- views: A path to the place where views are stored.
- view engine: The view engine to use.
- compress: Enables compression.
- static: A path or array of paths to the application static files.
- static options: Options to pass to the static middleware. See: https://github.com/expressjs/serve-static
- database: The config for the db connection, see: http://sequelize.readthedocs.org/en/latest/api/sequelize/#new-sequelizedatabase-usernamenull-passwordnull-options
- models: A function, passed a sequelize instance, that returns all the defined models.
- locals: A series of values accessible in the template.
- less: A string or array of paths that will be converted into css files.
- less options: Options that are passed to the less middleware.
- sass: A string or array of paths that will be converted into css files.
- sass options: Options that are passed to the sass middleware.
*/

var options = {
	set: function set(key, value) {
		// Handle logic relating to specific options
		switch (key) {
		case "app":
			this.app = value;
			break;
		default:
			break;
		}

		// Set the value to the storage
		this._options[key] = value;
		return this;
	},

	get: function get(key) {
		return this._options[key];
	},

	enable: function enable(key) {
		this.set(key, true);
		return this;
	},

	disable: function disable(key) {
		this.set(key, false);
		return this;
	},

	enabled: function enabled(key) {
		return !!this.get(key);
	},

	disabled: function disabled(key) {
		return !this.get(key);
	},

	options: function options(opts) {
		// Return the options if no parameters were provided
		if (!arguments.length) {
			return this._options;
		}

		// Check that its actually an object
		if (_.isPlainObject(opts)) {
			_.forOwn(opts, function(value, key) {
				this.set(key, value);
			}, this);
		}

		// Enable chaining
		return this;
	}
};

module.exports = options;
