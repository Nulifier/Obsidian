"use strict";

var _			= require("lodash");
var Sequelize	= require("sequelize");

function initDb() {
	var databaseConfig = this.get("database");

	// Create the database connection
	if (!this.sequelize) {
		if (_.isPlainObject(databaseConfig)) {
			this.sequelize = new Sequelize(
				databaseConfig.database,
				databaseConfig.username,
				databaseConfig.password,
				databaseConfig);
		}
		else if (_.isString(databaseConfig)) {
			this.sequelize = new Sequelize(databaseConfig, {});
		}
		else {
			throw new Error("database config setting must be a settings object or connection string");
		}
	}

	// Load the models
	if (this.get("models")) {
		this._models = this.get("models")(this.sequelize);
	}
}

module.exports = initDb;
