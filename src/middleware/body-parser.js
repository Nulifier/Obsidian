import bodyParser	from "body-parser";

export default function loadBodyParserMiddleware() {
	this.app.use(bodyParser.json());
	this.app.use(bodyParser.urlencoded({extended: true}));
}