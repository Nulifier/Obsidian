import {parseJSON, checkStatus} from "./jsend";
import {kebabCase} from "lodash";

export default class Rest {
	static requestDescription() {
		return fetch("/api/rest", {
			headers: {
				Accept: "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static requestContent(type) {
		return fetch(`/api/${kebabCase(type)}`, {
			headers: {
				Accept: "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static requestContentItem(type, id) {
		return fetch(`/api/${kebabCase(type)}/${id}`, {
			headers: {
				Accept: "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static createContentItem(type, item) {
		return fetch(`/api/${kebabCase(type)}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(item)
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static updateContentItem(type, item) {
		if (!parseInt(item.id)) {
			throw new Error(type + " must have a valid ")
		}

		return fetch(`/api/${kebabCase(type)}/${item.id}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(item)
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static destroyContentItem(type, item) {
		if (!parseInt(item.id)) {
			throw new Error(type + " must have a valid ")
		}

		return fetch(`/api/${kebabCase(type)}/${item.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}
}

// TODO: Remove this export
global.Rest = Rest;
