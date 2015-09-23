import React, {PropTypes} from "react";
import BaseField from "./base-field";
import {startCase, assign} from "lodash";

// TODO: Make this handle a placeholder if no default or nullable
export default class EnumField extends BaseField {
	render() {
		let options = this.props.fieldDesc.values.map((value) => {
			 return <option key={value} value={value}>{startCase(value)}</option>;
		})

		return (
			<select
				value={this.props.fieldValue}
				onChange={this.handleInputChangeEvent.bind(this)} >
				{options}
			</select>
		);
	}
}

EnumField.propTypes = assign({}, BaseField.propTypes, {
	fieldValue: PropTypes.string.isRequired,
	fieldDesc: PropTypes.shape({
		type: PropTypes.string.isRequired,
		values: PropTypes.arrayOf(PropTypes.string).isRequired
	}).isRequired
});