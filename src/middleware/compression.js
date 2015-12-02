import compression	from "compression";

export default function loadCompressionMiddleware() {
	if (this.enabled("compress")) {
		this.app.use(compression());
	}
}