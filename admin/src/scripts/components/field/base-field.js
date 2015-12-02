import React, {Component, PropTypes} from "react";

export default class BaseField extends Component {
	handleInputChangeEvent(event) {
		this.handleInputChange(event.target.value);
	}

	handleInputChange(newValue) {
		this.props.onChange(this.props.fieldName, newValue);
	}

	render() {
		return <p>{this.props.fieldName + ": " + this.props.fieldValue}</p>;
	}
}

BaseField.propTypes = {
	fieldName:		PropTypes.string.isRequired,
	fieldValue:		PropTypes.any,
	fieldDesc:		PropTypes.shape({
		type: PropTypes.string.isRequired
	}).isRequired,
	onChange:		PropTypes.func.isRequired
}