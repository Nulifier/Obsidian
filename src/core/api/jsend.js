// All went well
export function sendSuccess(res, data) {
	return res.json({
		status: "success",
		data: data
	});
}

// The client screwed up
export function sendFail(res, data) {
	return res.json({
		status: "fail",
	})
}

// There is a server error
export function sendError(res, message, code, data) {
	return res.json({
		status: "error",
		message: message,
		code: code,
		data: data
	});
}