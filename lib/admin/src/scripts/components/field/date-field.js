import React, {PropTypes} from "react";
import BaseField from "./base-field";
import DatePicker from "react-datepicker";
import moment from "moment";
import {assign} from "lodash";

export default class DateField extends BaseField {
	render() {
		const value = this.props.fieldValue;
		return (
			<DatePicker
				selected={value ? moment(value) : null}
				onChange={this.handleInputChange.bind(this)}
				dateFormat={this.props.dateFormat}
				placeholderText={this.props.placeholderText}
				weekStart="0" />
		);
	}
}

DateField.propTypes = assign({}, BaseField.propTypes, {
	fieldValue: function(props, propName, componentName) {
		let prop = props[propName];
		if (!moment(prop).isValid()) {
			return new Error(`Invalid prop \`${propName}\` of type \`${typeof(prop)}\` supplied to \`${componentName}\`, expected a moment.`);
		}
	},
	dateFormat: PropTypes.string,
	placeholderText: PropTypes.string,
});

DateField.defaultProps = {
	dateFormat: "DD-MMM-YYYY",
	placeholderText: "Click to select a date"
};