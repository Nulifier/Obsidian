export default function loadObsidianMiddleware() {
	this.app.use((req, res, next) => {
		res.locals.obsidian = this;
		next();
	});
}