"use strict";

module.exports = function(obsidian) {
	var Model = obsidian.bookshelf.Model.extend(
		{
			// Prototype props here
		},
		{
			// Registers this model with obsidian
			register: function(name) {
				obsidian.registerModel(name, this);
			},

			// Returns all the fields that should be editable
			getEditableFields: function() {
				return [];
			}
		}
	);

	Model.register("Model");

	return Model;
};
