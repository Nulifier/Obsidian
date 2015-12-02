import {isUndefined as _isUndefined}	from "lodash";

export function isUndefined(value) {
	return _isUndefined(value) || (value.hash != null);
}