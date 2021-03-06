"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = start;function start() {
	// Check to see if the init function has been called
	if (!this.app) {
		throw new Error("app must be initialized. Call obsidian.init() prior to start().");}


	var self = this;
	var app = this.app;
	var host = this.get("host");
	var port = this.get("port");

	// Start the server
	function serverStartCallback() {
		/* istanbul ignore if */
		if (app.get("env") !== "test") {
			self.log.info("Server listening on port %d", port);}}



	// Start the server
	if (host) {
		this.httpServer = app.listen(port, host, serverStartCallback);} else 

	{
		this.httpServer = app.listen(port, serverStartCallback);}


	return this;}module.exports = exports["default"];