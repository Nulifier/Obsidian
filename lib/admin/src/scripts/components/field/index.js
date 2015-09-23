import React, {PropTypes} from "react";

import BaseField from "./base-field";
import StringField from "./string-field";
import EnumField from "./enum-field";

class Field extends BaseField {
	constructor(props) {
		super(props);
		this.fieldTypes = {
			string: StringField,
			enum: EnumField
		}
	}

	render() {
		let FieldType = this.fieldTypes[this.props.fieldDesc.type] || BaseField;
		return <FieldType {...this.props} />;
	}
}

export default Field;