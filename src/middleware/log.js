export default function loadLogMiddleware() {
	this.app.use((req, res, next) => {
		this.log.info({
			req: req
		}, "Request");
		next();
	});
}