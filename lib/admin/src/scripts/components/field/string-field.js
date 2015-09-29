import React, {PropTypes} from "react";
import BaseField from "./base-field";
import {startCase, assign} from "lodash";

export default class StringField extends BaseField {
	render() {
		let fieldName = this.props.fieldName;

		return <input
			type="text"
			name={fieldName}
			value={this.props.fieldValue}
			placeholder={"Enter the " + startCase(fieldName)}
			onChange={this.handleInputChangeEvent.bind(this)} />;
	}
}

StringField.propTypes = assign({}, BaseField.propTypes, {
	fieldValue: PropTypes.string
});