"use strict";

function getModel(name) {
	return this.bookshelf.model(name);
}

module.exports = getModel;
