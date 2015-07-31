"use strict";

module.exports = function(obsidian) {
	var Users = obsidian.collections.Collection.extend({
		model: obsidian.models.User
	});

	Users.register("Users");

	return Users;
};
