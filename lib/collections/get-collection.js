"use strict";

function getCollection(name) {
	return this.bookshelf.collection(name);
}

module.exports = getCollection;
