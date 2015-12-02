import {join}	from "path";

export default function loadStaticAdminMiddleware() {
	if (this.get("admin ui")) {
		this.app.use(this.express.static(join(__dirname, "../../admin/static")));
	}
}