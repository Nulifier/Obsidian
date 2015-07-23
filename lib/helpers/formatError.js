"use strict";

function formatError(title, msg) {
	return "<!DOCTYPE html><html lang=\"en\">"
	+ "<head><meta charset=\"utf-8\"><title>Error</title></head>"
	+ "<body>"
	+ "<h1>" + title + "</h1>"
	+ "<pre>" + (msg || "") + "</pre>"
	+ "</body>"
	+ "</html>";
}

module.exports = formatError;
