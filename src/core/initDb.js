import {Mongoose}				from "mongoose";
import path						from "path";
import {capitalize, kebabCase}	from "lodash";
import loadField				from "../fields/field";
import loadList					from "../lists/list";

export default function initDb() {
	const databaseConfig = this.get("database");

	// Store the version of mongoose we are using
	this.mongoose = new Mongoose();
	this.mongoose.Promise = Promise;	// Mongoose is using non-standard promises

	this.Schema = this.mongoose.Schema;
	this.model = this.mongoose.model.bind(this.mongoose);

	const mongoUri = this.get("mongo");

	// Make sure the mongo URI exists or find an appropriate one from environmental variables
	// http://docs.mongodb.org/manual/reference/connection-string/
	// TODO Mongo URI

	if (!mongoUri) {
		throw new Error("The MongoDB URI must be set");
	}

	// Connect to the DB
	this.mongoose.connect(mongoUri);

	// Load the classes
	this.List = loadList(this);
	this.Field = loadField(this);
	const loadType = (typeName, func) => {
		return this.forDirectory(`../${kebabCase(typeName)}s/*.js`, {cwd: __dirname}, (file) => {
			const name = capitalize(path.basename(file, ".js"));

			// Skip the base class file
			if (name === typeName) {
				return;
			}

			// Load the class
			const type = require(file)(this);
			if (typeof func === "function") func(name, type);
		});
	};
	loadType("Field", (name, field) => {
		this.fields[name] = field;
	}).then(() => {
		return loadType("List");
	})
	.catch(err => this.log.error(err));
}