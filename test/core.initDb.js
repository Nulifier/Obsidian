"use strict";

var _			= require("lodash");
var initDb		= require("../lib/core/initDb");

describe("core.initDb", function() {
	var fakeThis = {
		_database: {
			dialect: "sqlite",
			logging: false
		},
		get: function(key) {
			if (key === "database") {
				return this._database;
			}
		}
	};

	it("should create a sequelize object from a config object", function() {
		var obsidian = _.defaults({}, fakeThis);
		initDb.call(obsidian);
		should.exist(obsidian.sequelize);
	});

	it("should create a sequelize object from a config string", function() {
		var obsidian = _.defaults({
			_database: "sqlite://::memory::"
		}, fakeThis);
		initDb.call(obsidian);
		should.exist(obsidian.sequelize);
	});

	it("should do nothing if the database connection already exists", function() {
		var obsidian = _.defaults({
			sequelize: "a string that evaluates to true"
		}, fakeThis);

		initDb.call(obsidian);
		obsidian.sequelize.should.equal("a string that evaluates to true");
	});

	it("should throw an error if the config is neither a plain object or string", function() {
		var obsidian = _.defaults({
			_database: [1, 2, 3]
		}, fakeThis);

		var thrown = false;
		try {
			initDb.call(obsidian);
		}
		catch(err) {
			err.should.be.an("Error");
			thrown = true;
		}
		thrown.should.be.true;
	});
});
