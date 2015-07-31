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
	});

	User.register("User");

	return User;
};
