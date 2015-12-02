import bunyan		from "bunyan";

export default function logs() {
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