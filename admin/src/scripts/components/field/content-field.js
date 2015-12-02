import React, {PropTypes} from "react";
import BaseField from "./base-field";
import {startCase, assign} from "lodash";

export default class ContentField extends BaseField {
	render() {
		return (
			<textarea
				style={{width: "700px", height: "1000px"}}
				value={this.props.fieldValue}
				onChange={this.handleInputChangeEvent.bind(this)} />
		);
	}
}

ContentField.propTypes = assign({}, BaseField.propTypes, {
	fieldValue: PropTypes.string
});