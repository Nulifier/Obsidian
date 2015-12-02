export default function(obsidian) {	
	class Field {
		constructor(list, path, options) {
			this.list = list;
			this.path = path;
			this.options = Object.assign({}, this.constructor.defaults, options);

			this.addToSchema();
		}

		// Adds the field to the list's schema
		addToSchema() {
			this.list.schema.path(this.path, this.options);
		}

		getFieldName() {
			throw new Error("getFieldName must be defined for Field types");
		}
	}

	Field.defaults = {};

	return Field;
}