import _	from "lodash";

export default function redirect(from, to) {
	if (_.isPlainObject(from)) {
		_.assign(this._redirects, from);
	}
	else if (_.isString(from) && _.isString(to)) {
		this._redirects[from] = to;
	}

	return this;
}