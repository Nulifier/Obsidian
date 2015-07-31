"use strict";

module.exports = function(obsidian) {
	var Model = obsidian.bookshelf.Model.extend({
		// Prototype props here
	},
	{
		// Class props here
		register: function(name) {
			obsidian.registerModel(name, this);
		}
	});

	Model.register("Model");

	return Model;
}
