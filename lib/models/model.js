"use strict";

var _	= require("lodash");

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

			// Determines if the model is visible in the admin UI
			// This can be used to have content types that have specialized editors
			adminUiVisible: true,

			// All the fields that should be visible by the admin
			fields: {},

			// The order the fields will display in the admin interface
			fieldsOrder: [],

			// Returns a JSON object that describes the visible fields of this model.
			getApiDescription: function() {
				var visible = _.isFunction(this.adminUiVisible) ? this.adminUiVisible() : this.adminUiVisible;
				var fields = _.isFunction(this.fields) ? this.fields() : this.fields;
				var order = _.isFunction(this.fieldsOrder) ? this.fieldsOrder() : this.fieldsOrder;

				return {
					visible: visible,
					fields: fields,
					fieldOrder: order
				};
			}
		}
	);

	Model.register("Model");

	return Model;
};
