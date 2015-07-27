"use strict";

var _			= require("lodash");
var Sequelize	= require("sequelize");

var Field = {
	get type() {
		// Check if we have a type already assigned
		if (this._type) {
			if (_.isString(this._type)) {
				return this._type;
			}
			else if (_.isFunction(this._type)) {
				// This is just the function like Sequelize.INTEGER
				//   we want Sequelize.INTEGER()
				this._type = this._type();
			}

			return this._type.toSql();
		}

		// Create the type dynamically
		var def = this._typeDef;

		var ret;

		switch (def.type) {
			case "STRING":
			case "CHAR":
				ret = Sequelize[def.type](def.length, def.binary);
				break;
			case "TEXT":
			case "INTEGER":
			case "BIGINT":
			case "BLOB":
				ret = Sequelize[def.type](def.length);
				break;
			case "FLOAT":
			case "REAL":
			case "DOUBLE":
				ret = Sequelize[def.type](def.length, def.decimals);
				break;
			case "DECIMAL":
				ret = Sequelize[def.type](def.precision, def.scale);
				break;
			case "BOOLEAN":
			case "TIME":
			case "DATEONLY":
			case "DATETIME":
			case "HSTORE":
			case "JSON":
			case "JSONB":
			case "NOW":
				ret = Sequelize[def.type]();
				break;
			default:
				throw new Error("Invalid type requested: " + def.type);
		}

		if (_.includes(["INTEGER", "BIGINT", "FLOAT", "REAL", "DOUBLE", "DECIMAL"], def.type)) {
			if (def.unsigned) {
				ret = ret.UNSIGNED;
			}
			if (def.zerofill) {
				ret = ret.ZEROFILL;
			}
		}

		return ret.toSql();
	},

	set type(val) {
		this._type = val;
	},

	get Required() {
		return _.assign(this, {
			allowNull: false
		});
	},

	Default: function(val) {
		return _.assign(this, {
			defaultValue: val
		});
	},

	get Unique() {
		return _.assign(this, {
			unique: true
		});
	},

	get Primary() {
		return _.assign(this, {
			primaryKey: true
		});
	},

	Field: function(name) {
		return _.assign(this, {
			field: name
		});
	},

	get AutoIncrement() {
		return _.assign(this, {
			autoIncrement: true
		});
	},

	Comment: function(comment) {
		return _.assign(this, {
			comment: comment
		});
	},

	// Type modifiers
	Length: function(length) {
		this._typeDef.length = length;
		return this;
	},

	get Binary() {
		this._typeDef.binary = true;
		return this;
	},

	get Unsigned() {
		this._typeDef.unsigned = true;
		return this;
	},

	get ZeroFill() {
		this._typeDef.zerofill = true;
		return this;
	},

	Decimals: function(decimals) {
		this._typeDef.decimals = decimals;
		return this;
	},

	Precision: function(precision) {
		this._typeDef.precision = precision;
		return this;
	},

	Scale: function(scale) {
		this._typeDef.scale = scale;
		return this;
	},

	extend: function(opts) {
		_.extend(this, opts);
		return this;
	}
};

module.exports = Field;
