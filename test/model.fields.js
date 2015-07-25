"use strict";

var _			= require("lodash");
var fields		= require("../lib/model/fields");
var Sequelize	= require("sequelize");

describe("model.fields", function() {
	it("should export a hash", function() {
		fields.should.be.a("object");
	});

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

	_.forEach(types, function(expected, type) {
		it("should have a " + type + " field", function() {
			fields.should.have.property(type);
		});
	});

	it("should have a Enum field", function() {
		fields.should.have.property("Enum");
	});

	describe("Field", function() {
		it(".type should throw an Error if the type is invalid", function() {
			var thrown = false;
			try {
				var str = fields.String;
				str._typeDef.type = "WRONG";
				str.type;
			}
			catch(err) {
				err.should.be.an("Error");
				thrown = true;
			}
			thrown.should.be.true;
		});

		it(".type should be able to be set with a string", function() {
			var field = fields.String;
			field.type = "SQL STRING";
			field.type.should.equal("SQL STRING");
		});

		it(".type should be able to be set with a type like INTEGER", function() {
			var field = fields.String;
			field.type = Sequelize.INTEGER;
			field.type.should.be.a("string");
		});

		it(".type should be able to be set with a type like INTEGER()", function() {
			var field = fields.String;
			field.type = Sequelize.INTEGER();
			field.type.should.be.a("string");
		});

		it("should have a Required modifier", function() {
			fields.Integer.Required.allowNull.should.be.false;
		});

		it("should have a Default modifier", function() {
			fields.Integer.Default(42).defaultValue.should.equal(42);
		});

		it("should have a Unique modifier", function() {
			fields.Integer.Unique.unique.should.be.true;
		});

		it("should have a Primary modifier", function() {
			fields.Integer.Primary.primaryKey.should.be.true;
		});

		it("should have a Field modifier", function() {
			fields.Integer.Field("betterName").field.should.equal("betterName");
		});

		it("should have an AutoIncrement modifier", function() {
			fields.Integer.AutoIncrement.autoIncrement.should.be.true;
		});

		it("should have a Comment modifier", function() {
			fields.Integer.Comment("A comment").comment.should.equal("A comment");
		});

		it("should have a Length type modifer", function() {
			fields.String.Length(5).type.should.match(/\(5\)/);
		});

		it("should have a Binary type modifier", function() {
			fields.String.Binary.type.should.match(/BINARY/);
		});

		it("should have an Unsigned type modifier", function() {
			fields.Integer.Unsigned.type.should.match(/UNSIGNED/);
		});

		it("should have a ZeroFill type modifier", function() {
			fields.Integer.ZeroFill.type.should.match(/ZEROFILL/);
		});

		it("should have a Decimals type modifier", function() {
			fields.Float.Length(8).Decimals(4).type.should.match(/\(8,4\)/);
		});

		it("should have a Precision type modifier", function() {
			fields.Decimal.Precision(3).type.should.match(/\(3\)/);
		});

		it("should have a Scale type modifier", function() {
			fields.Decimal.Scale(7).type.should.match(/\(7\)/);
		});

		it("should have a extend modifier", function() {
			fields.String.Unique.extend({
				unique: false
			}).unique.should.be.false;
		});
	});

	// Test each of the types
	_.forEach(types, function(expected, type) {
		describe(type + " field", function() {
			it("should have a string in the type field", function() {
				fields[type].type.should.be.a("string");
			});
		});
	});

	describe("Enum field", function() {
		it("should have a string in the type field", function() {
			fields.Enum().type.should.be.a("string");
		});

		// There is no way to test if the parameters are passed
		//		in as this requires a specific SQL dialect.
		// it("should use the parameters passed in");
	});
});
