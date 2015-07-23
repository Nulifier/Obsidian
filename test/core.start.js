"use strict";

var _			= require("lodash");
var Obsidian	= require("../lib/obsidian");

describe("start", function() {
	var initOptions = {
		port: 12345,
		database: {
			dialect: "sqlite",
			logging: false
		},
		routes: function() {}
	};

	it("should fail if the app isn't initialized", function() {
		var obsidian = new Obsidian();
		var threw = false;
		try {
			obsidian.start();
		}
		catch(err) {
			err.should.be.an("Error");
			threw = true;
		}
		threw.should.be.true;
	});

	it("should start the http server without a host provided", function(done) {
		var obsidian = new Obsidian();
		obsidian.init(initOptions);
		obsidian.start();
		should.exist(obsidian.httpServer);
		obsidian.httpServer.on("listening", function() {
			obsidian.httpServer.close();
			done();
		});
	});

	it("should start the http server with a host provided", function(done) {
		var obsidian = new Obsidian();
		obsidian.init(_.defaults({
			host: "0.0.0.0"
		}, initOptions));
		obsidian.start();
		should.exist(obsidian.httpServer);
		obsidian.httpServer.on("listening", function() {
			obsidian.httpServer.close();
			done();
		});
	});
});
