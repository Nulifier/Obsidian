import React, {Component} from "react";
import {connect} from "react-redux";
import {requestContent, requestContentItem, saveContentItem} from "../actions";
import _ from "lodash";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.min.css");
import {getContentTitle} from "../util";
import moment from "moment";
import Select from "react-select";
import Field from "../components/field";

function isForeignKey(typeName) {
	return typeName.search(/^[A-Z]/) !== -1;
}

class ContentView extends Component {
	constructor(props) {
		super(props);
		this.requestContent(props.typeName, props.id);
		this.requestForeignKeys(props.contentType);
		this.state = {item: props.item};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.typeName !== nextProps.typeName ||
			this.props.id !== nextProps.id) {
			this.requestContent(nextProps.typeName, nextProps.id);
		}
		if (!_.isEqual(this.props.contentType, nextProps.contentType)) {
			this.requestForeignKeys(nextProps.contentType);
		}
		if (!_.isEqual(this.props.item, nextProps.item)) {
			this.setState({item: nextProps.item});
		}
	}
	requestContent(typeName, id) {
		this.props.requestContentItem(typeName, id);
	}
	requestForeignKeys(contentType) {
		// Look for foreign keys
		_.map(contentType.fields, (field, fieldName) => {
			if (isForeignKey(field.type)) {
				this.props.requestContent(field.type);
			}
		});
	}

	createChangeHandler(fieldName) {
		return (event) => {
			this.handleChange(fieldName, event.target.value);
		};
	}

	handleChange(fieldName, newValue) {
		let newItem = Object.assign({}, this.state.item);
		newItem[fieldName] = newValue;
		this.setState({
			item: newItem
		});
	}

	saveForm(event) {
		event.preventDefault();
		this.props.saveContentItem(this.props.typeName, this.state.item);
	}

	render() {
		// Iterate through each field in order and generate the editor for that type
		const fieldOrder = this.props.contentType.fieldOrder || [];
		const item = this.state.item || {};

		let fields = fieldOrder.map((fieldName) => {
			let field = this.props.contentType.fields[fieldName];

			let input = <p>{fieldName}</p>;

			if (field.type === "string" ||
				field.type === "enum") {
				input = <Field
					fieldName={fieldName}
					fieldValue={item[fieldName]}
					fieldDesc={field}
					onChange={this.handleChange.bind(this)} />;
			}
			/*else if (field.type === "enum") {
				let options = field.values.map((value) => {
					return <option key={value} value={value}>{_.startCase(value)}</option>;
				});

				input = (
					<select value={item[fieldName]} onChange={this.createChangeHandler(fieldName)}>
						{options}
					</select>
				);
			}*/
			else if (field.type === "date") {
				input = <DatePicker
					selected={moment(item[fieldName])}
					onChange={this.handleChange.bind(this, fieldName)}
					dateFormat="DD-MMM-YYYY"
					placeholderText="Enter a date"
					weekStart="0"
					className="" />;
			}
			else if (field.type === "content") {
				input = <textarea style={{width: "700px", height: "1000px"}} value={item[fieldName]} onChange={this.createChangeHandler(fieldName)} />;
			}
			else if (isForeignKey(field.type)) {
				let options = _.map(this.props.otherContent[field.type], (item, id) => {
					return {value: parseInt(id), label: getContentTitle(item)};
				});

				input = (
					<div className="obs-field">
						<Select
							value={parseInt(item[fieldName]) || ""}
							onChange={this.handleChange.bind(this, fieldName)}
							options={options}
							/>
					</div>
				);
			}

			return (
				<fieldset key={fieldName}>
					<label htmlFor={fieldName}>{_.startCase(fieldName)}</label>
					{input}
				</fieldset>
			);
		});

		return (
			<form className="obs-form" onSubmit={this.saveForm.bind(this)}>
				<div className="obs-toolbar">
					<button type="submit" className="obs-button button-primary">Save</button>
					<button className="obs-button button-warning">Delete</button>
				</div>
				{fields}
			</form>
		);
	}
}

function mapStateToProps(state) {
	const type = _.capitalize(state.router.params.type);
	const id = state.router.params.id;

	return {
		typeName: type,
		contentType: _.get(state, ["rest", "types", type], {}),
		item: _.get(state, ["rest", "content", type, id], {}),
		id,
		otherContent: state.rest.content
	};
}

export default connect(mapStateToProps, {
	requestContent,
	requestContentItem,
	saveContentItem
})(ContentView);