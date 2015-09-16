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
		fields: {
			username: {type: "string"},
			email: {type: "email"},
			firstName: {type: "string"},
			lastName: {type: "string"}
		},

		fieldsOrder: [
			"username",
			"email",
			"firstName",
			"lastName"
		]
	});

	User.register("User");

	return User;
};
