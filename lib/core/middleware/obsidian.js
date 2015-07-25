"use strict";

module.exports = function() {
	var self = this;
	this.app.use(function(req, res, next) {
		res.locals.obsidian = self;
		next();
	});
};
