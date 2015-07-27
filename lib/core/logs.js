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
			serializers: {
				req: function reqSerializer(req) {
					return {
						params: req.params,
						path: req.path,
						protocol: req.protocol,
						query: req.query
					};
				}
			}
		})
	};
}

module.exports = logs;
