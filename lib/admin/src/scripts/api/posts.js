import {parseJSON, checkStatus} from "./jsend";

export default class Posts {
	static findAll() {
		return fetch("/api/post", {
			headers: {
				Accept: "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static findById(id) {
		return fetch(`/api/post/${id}`, {
			headers: {
				Accept: "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static create(post) {
		return fetch("/api/post", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(post)
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static update(post) {
		if (parseInt(!post.id)) {
			throw new Error("Post must have a valid id to update.");
		}

		return fetch(`/api/post/${post.id}`, {
			method: "PUT",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(post)
		})
		.then(parseJSON)
		.then(checkStatus);
	}

	static destroy(post) {
		if (parseInt(!post.id)) {
			throw new Error("Post must have a valid id to delete");
		}

		return fetch(`/api/post/${post.id}`, {
			method: "DELETE",
			headers: {
				"Accept": "application/json"
			}
		})
		.then(parseJSON)
		.then(checkStatus);
	}
}

// TODO: Remove this export
global.Posts = Posts;
