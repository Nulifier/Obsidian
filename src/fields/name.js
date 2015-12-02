import {compact}	from "lodash";

export default function(obsidian) {
	return class NameField extends obsidian.Field {
		addToSchema() {
			const paths = {
				first: this.path.concat(".first"),
				last: this.path.concat(".last"),
				full: this.path.concat(".full")
			};

			// Add the sub-fields to the schema
			this.list.schema.add({
				first: String,
				last: String
			}, this.path + ".");

			this.list.schema.virtual(paths.full).get(() => {
				return compact([this.get(paths.first), this.get(paths.last)]).join(" ");
			});
		}

		getFieldName() {
			return "Name";
		}
	}
}