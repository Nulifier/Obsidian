import {parseJSON, checkStatus} from "./jsend";

export default class Rest {
	static query() {
		return fetch("/api/rest", {
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
