"use strict";

module.exports = function(obsidian) {
	var Collection = obsidian.bookshelf.Collection.extend({
		limit: 10,
		page: 1,
		order: "desc",

		fetchPage: function(sortBy, options, fetchOptions) {
			sortBy = sortBy || "id";
			options = options || {};
			fetchOptions = fetchOptions || {};

			var self = this;
			var limit = Math.min(parseInt(options.limit, 10) || self.limit, 100);
			var page = parseInt(options.page, 10) || self.page;
			var order = options.order || self.order;
			var queries = options.where || [];

			return self.constructor.forge()
			.query(function(query) {
				query.limit(limit);

				queries.forEach(function(where, i) {
					if (i === 0) {
						query.where(where[0], where[1], where[2]);
					}
					else {
						query.andWhere(where[0], where[1], where[2]);
					}
				});

				query.offset((page - 1) * limit);
				query.orderBy(sortBy, order);
			})
			.fetch(fetchOptions);
		}
	},
	{
		register: function(name) {
			obsidian.registerCollection(name, this);
		}
	});

	Collection.register("Collection");

	return Collection;
}
