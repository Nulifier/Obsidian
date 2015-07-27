"use strict";

var _			= require("lodash");
var Sequelize	= require("sequelize");
var Field		= require("./field");

function makeType(type) {
	return _.create(Field, {
		_typeDef: {
			type: type
		}
	});
}

var fields = {
	Enum: function() {
		return _.create(Field, {
			_type: Sequelize.ENUM(_.toArray(arguments))	// eslint-disable-line new-cap
		});
	}
};

// This is a mapping from Field: SEQUELIZE
var types = {
	String: "STRING",
	Char: "CHAR",
	Text: "TEXT",
	Integer: "INTEGER",
	BigInt: "BIGINT",
	Float: "FLOAT",
	Real: "REAL",
	Double: "DOUBLE",
	Decimal: "DECIMAL",
	Boolean: "BOOLEAN",
	Time: "TIME",
	DateTime: "DATEONLY",
	Date: "DATEONLY",
	HStore: "HSTORE",
	JSON: "JSON",
	JSONB: "JSONB"
};

// Add getters for each type
_.forEach(types, function(type, funcName) {
	Object.defineProperty(fields, funcName, {
		get: function() {
			return makeType(type);
		}
	});
});

module.exports = fields;
