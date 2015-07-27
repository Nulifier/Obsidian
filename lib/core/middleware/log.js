"use strict";

module.exports = function() {
	var self = this;
	this.app.use(function(req, res, next) {
		self.log.info({
			req: req
		}, "Request");
		next();
	});
};
