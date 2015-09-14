"use strict";

module.exports = function(obsidian) {
	var User = obsidian.models.Model.extend({
		tableName: "users",
		visible: [
			"id",
			"username",
			"firstName",
			"lastName"
		]
	},
	{
		getEditableFields: function() {
			return [
				{name: "username", type: "string"},
				{name: "email", type: "email"},
				{name: "firstName", type: "string"},
				{name: "lastName", type: "string"}
			];
		}
	});

	User.register("User");

	return User;
};
