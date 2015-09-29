import React, {PropTypes} from "react";
import BaseField from "./base-field";
import {startCase, assign} from "lodash";

export default class EnumField extends BaseField {
	render() {
		let options = this.props.fieldDesc.values.map((value) => {
			 return <option key={value} value={value}>{startCase(value)}</option>;
		});

		// Default props
		let required = this.props.fieldDesc.required || false;
		let defaultVal = required ? this.props.fieldDesc.default : "";

		// Check if we need a placeholder value
		// This is only needed if there is:
		// - Not required OR
		// - Required with no default value (placeholder is disabled)
		if (!required) {
			options.unshift(<option value="" key="placeholder">Select an Option</option>);
		}
		else if (!defaultVal) {
			options.unshift(<option value="" disabled key="placeholder">Select an Option</option>);
		}

		return (
			<select
				value={this.props.fieldValue || defaultVal}
				defaultValue={required && !defaultVal ? "" : false}
				onChange={this.handleInputChangeEvent.bind(this)} >
				{options}
			</select>
		);
	}
}

EnumField.propTypes = assign({}, BaseField.propTypes, {
	fieldValue: PropTypes.string,
	fieldDesc: PropTypes.shape({
		type: PropTypes.string.isRequired,
		values: PropTypes.arrayOf(PropTypes.string).isRequired,
		required: PropTypes.bool,
		default: PropTypes.string
	}).isRequired
});