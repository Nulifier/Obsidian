import React, {PropTypes} from "react";

import BaseField from "./base-field";
import StringField from "./string-field";
import EnumField from "./enum-field";
import DateField from "./date-field";
import ContentField from "./content-field";
import LocationField from "./location-field";

import ForeignKeyField from "./foreign-key-field";

function isForeignKey(typeName) {
	return typeName.search(/^[A-Z]/) !== -1;
}

class Field extends BaseField {
	constructor(props) {
		super(props);
		this.fieldTypes = {
			string: StringField,
			enum: EnumField,
			date: DateField,
			content: ContentField,
			location: LocationField
		}
	}

	getFieldType(typeName) {
		if (isForeignKey(typeName)) {
			return ForeignKeyField;
		}
		else {
			return this.fieldTypes[this.props.fieldDesc.type] || BaseField;
		}
	}

	render() {
		let FieldType = this.getFieldType(this.props.fieldDesc.type);
		return <FieldType {...this.props} />;
	}
}

export default Field;