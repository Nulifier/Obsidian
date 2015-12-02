export default function(obsidian) {
	return class TextField extends obsidian.Field {
		constructor(list, path, options) {
			options.type = String;
			super(list, path, options);
		}

		getFieldName() {
			return "Text";
		}
	}
}