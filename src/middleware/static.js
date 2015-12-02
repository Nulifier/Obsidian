import {isString, isArray}	from "lodash";

export default function loadStaticMiddleware() {
	let staticPaths = this.get("static");
	const staticOptions = this.get("static options");

	// Convert staticPaths to array if needed
	if (isString(staticPaths)) {
		staticPaths = [staticPaths];
	}

	if (isArray(staticPaths)) {
		staticPaths.forEach((staticPath) => {
			this.app.use(this.express.static(staticPath, staticOptions));
		});
	}
}