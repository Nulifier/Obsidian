import {isPlainObject}	from "lodash";

export default function defineList(obsidian) {
	class List {
		constructor(listName, options) {
			this.options = Object.assign({}, this.constructor.defaults, options);

			// Validation
			if (typeof listName !== "string") {
				throw new Error("listName must be a string");
			}

			// List Name
			this.listName = listName;
			this.schema = new obsidian.mongoose.Schema({}, this.options.schema);
			this.schemaFields = {};
			this.uiElements = [];
		}

		// Adds fields to the list
		add(fields) {
			const addField = (path, options) => {
				if (obsidian.Field === options || obsidian.Field === options.type) {
					throw new Error("The field type must be a child class of obsidian.Field");
				}

				// Check if the options param is a Field
				if (obsidian.Field.isPrototypeOf(options)) {
					options = {type: options};
				}

				// Make sure the type field is a Field
				if (!obsidian.Field.isPrototypeOf(options.type)) {
					throw new Error("The type parameter must be an instance of the Field class");
				}

				this.schemaFields[path] = new options.type(this, path, options);
			}

			const processFieldDefinition = (definition, prefix = "") => {
				Object.keys(definition).forEach((key) => {
					const obj = definition[key];

					if (!obj) {
						throw new Error(`Invalid value for schema path ${prefix+key} in ${this.listName}`);
					}

					if (isPlainObject(obj) && !obj.type && Object.keys(obj).length) {
						// obj is a nested field
						processFieldDefinition(obj, prefix + key + ".");
					}
					else {
						addField(prefix + key, obj);
					}
				});
			}

			// Recursivly process the field definitions
			processFieldDefinition(fields);
		}

		register() {
			this.model = obsidian.mongoose.model(this.listName, this.schema);
			obsidian.lists[this.listName] = this;
		}
	}

	List.defaults = {
		schema: {}
	};

	return List;
}