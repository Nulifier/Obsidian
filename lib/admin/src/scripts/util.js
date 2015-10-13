export function getContentTitle(item) {
	if ("title" in item) {
		return item.title;
	}
	else if (("firstName" in item) && ("lastName" in item)) {
		return item.firstName + " " + item.lastName;
	}
	else {
		return "Untitled";
	}
}