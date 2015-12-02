export default function start() {
	// Check to see if the init function has been called
	if (!this.app) {
		throw new Error("app must be initialized. Call obsidian.init() prior to start().");
	}

	const self = this;
	const app = this.app;
	const host = this.get("host");
	const port = this.get("port");

	// Start the server
	function serverStartCallback() {
		/* istanbul ignore if */
		if (app.get("env") !== "test") {
			self.log.info("Server listening on port %d", port);
		}
	}

	// Start the server
	if (host) {
		this.httpServer = app.listen(port, host, serverStartCallback);
	}
	else {
		this.httpServer = app.listen(port, serverStartCallback);
	}

	return this;
}