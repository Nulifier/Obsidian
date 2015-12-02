import {isArray, isObject, isNumber} from "lodash";

export default function(obsidian) {
	return class EnumField extends obsidian.Field {
		constructor(list, path, options) {
			super(list, path, options);

			// Make sure the options are provided
			if (!isArray(options.options)) {
				throw new Error("Enum field must have an options array.")
			}

			// Convert the options into an {value, label} map
			this.ops = this.options.map((value, index) => {
				if (isObject(value)) {
					// Make sure it has value an label properties
					if (!(("value" in value) && ("label" in value))) {
						throw new Error("Enum option must have a value and a label property");
					}

					return {value: value.value, label: value.label};
				}
				else {
					// Make up the option out of the value and the index
					return {value: value, label: index};
				}
			});
		}

		addToSchema() {
			const paths = {
				
			}
		}

		getFieldName() {
			return "Enum";
		}
	}
}