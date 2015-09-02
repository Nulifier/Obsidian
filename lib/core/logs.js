"use strict";

var bunyan		= require("bunyan");

function logs() {
	return {
		default: bunyan.createLogger({
			name: "obsidian",
			streams: [
				{
					stream: process.stdout,
					level: "info"
				},
				{
					path: "./log.json",
					level: "info"
				}
			],
			serializers: bunyan.stdSerializers
		})
	};
}

module.exports = logs;
