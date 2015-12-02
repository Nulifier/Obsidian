import moment			from "moment";
import {isUndefined}	from "./utils";

export function now(format) {
	var date = new Date();
	if (isUndefined(format)) {
		return date;
	}
	else {
		return moment(date).format(format);
	}
}