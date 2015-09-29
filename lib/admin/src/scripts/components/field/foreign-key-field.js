import React, {PropTypes} from "react";
import BaseField from "./base-field";
import Select from "react-select";
import {assign} from "lodash";
import {requestContent} from "../../api/rest";
import {getContentTitle} from "../../util";

export default class ForeignKeyField extends BaseField {
	handleInputChange(newValue) {
		// Convert the value to null if it's an empty string
		super.handleInputChange(newValue === "" ? null : newValue);
	}

	loadOptions(input, callback) {
		requestContent(this.props.fieldDesc.type)
		.then((data) => {
			const options = data.map((item) => {
				return {value: item.id, label: getContentTitle(item)};
			});
			callback(null, {
				options,
				complete: true
			});
		})
		.catch(callback);
	}

	render() {
		return (
			<div className="obs-field">
				<Select
					value={this.props.fieldValue || ""}
					onChange={this.handleInputChange.bind(this)}
					asyncOptions={this.loadOptions.bind(this)}
					placeholder={`Select ${this.props.fieldDesc.type}...`}
					/>
			</div>
		)
	}
}

ForeignKeyField.propTypes = assign({}, BaseField.propTypes, {
	fieldValue: PropTypes.number
});