export function parseJSON(response) {
	return response.json();
}

export function checkStatus(response) {
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