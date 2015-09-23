export function getContentTitle(item) {
	if ("title" in item) {
		return item.title;
	}
	else if (("firstName" in item) && ("lastName" in item)) {
		return item.firstName + " " + item.lastName;
	}
	else {
		console.log("Can't determine a title for item", item);
		return "Untitled";
	}
}