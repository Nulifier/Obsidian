fetch("/api/posts");

function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
	let status = response.status;
	if (status === "success") {
		return response.data;
	}
	else if (status === "fail") {
		let error = new Error("Failure fetching data");
		error.status = response.status;
		error.data = response.data;
		throw error;
	}
	else if (status === "error") {
		let error = new Error("Server error fetching data");
		error.status = response.status;
		error.message = response.message;
		error.code = response.code;
		error.data = response.data;
		throw error;
	}
}

export default class Posts {
	static findAll() {
		return fetch("/api/posts")
			.then(parseJSON)
			.then(checkStatus);
	}

	static findById(id) {
		return fetch(`/api/posts/${id}`)
			.then(parseJSON)
			.then(checkStatus);
	}

	static update(post) {
		if (parseInt(!post.id)) {
			throw new Error("Post must have a valid id to update.");
		}

		return fetch(`/api/posts/${post.id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(post)
		})
			.then(parseJSON)
			.then(checkStatus);
	}
}

global.Posts = Posts;
