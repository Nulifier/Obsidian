"use strict";

var defineModel		= require("../lib/model/defineModel");

describe("mode.defineModel", function() {
	var config;

	beforeEach("create config", function() {
		config = {
			name: "TestModel",
			attributes: {
				username: "StringType",
				password: "PasswordType"
			},
			option: true,
			otherOpt: false
		};
	});

	it("should throw an Error if no config is provided", function() {
		var thrown = false;
		try {
			defineModel();
		}
		catch(err) {
			err.should.be.an("Error");
			thrown = true;
		}
		thrown.should.be.true;
	});

	it("should throw an Error if an invalid config type is provided", function() {
		var thrown = false;
		try {
			defineModel("test");
		}
		catch(err) {
			err.should.be.an("Error");
			thrown = true;
		}
		thrown.should.be.true;
	});

	it("should throw an Error if no name is set", function() {
		delete config.name;
		var thrown = false;
		try {
			defineModel(config);
		}
		catch (err) {
			err.should.be.an("Error");
			thrown = true;
		}
		thrown.should.be.true;
	});

	it("should throw an Error if the attributes prop is not a hash", function() {
		delete config.attributes;
		var thrown = false;
		try {
			defineModel(config);
		}
		catch (err) {
			err.should.be.an("Error");
			thrown = true;
		}
		thrown.should.be.true;
	});

	it("should return a function", function() {
		defineModel(config).should.be.a("function");
	});

	describe("Loader function", function() {
		var loader;
		var fakeSequelize;

		beforeEach("define model", function() {
			loader = defineModel(config);
			fakeSequelize = {define: sinon.spy()};
		});

		it("should call the passed in object's define method with three arguments", function() {
			loader(fakeSequelize);
			fakeSequelize.define.should.be.calledOnce;
			fakeSequelize.define.args[0].length.should.equal(3);
		});

		it("should call the passed in object with the name", function() {
			loader(fakeSequelize);
			fakeSequelize.define.args[0][0].should.equal("TestModel");
		});

		it("should call the passed in object with the attributes", function() {
			loader(fakeSequelize);
			fakeSequelize.define.args[0][1].should.deep.equal(config.attributes);
		});

		it("should call the passed in object with the options", function() {
			loader(fakeSequelize);
			var opts = fakeSequelize.define.args[0][2];
			opts.should.have.property("option", true);
			opts.should.have.property("otherOpt", false);
		});

		it("should not include the name or attributes in the options", function() {
			loader(fakeSequelize);
			var opts = fakeSequelize.define.args[0][2];
			opts.should.not.have.property("name");
			opts.should.not.have.property("attributes");
		});
	});
});
