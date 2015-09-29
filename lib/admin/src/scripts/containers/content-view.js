import React, {Component} from "react";
import {connect} from "react-redux";
import {
	requestContent,
	requestContentItem,
	createContentItem,
	updateContentItem,
	deleteContentItem,
	redirect
} from "../actions";
import _ from "lodash";
import {getContentTitle} from "../util";
import Field from "../components/field";

function isForeignKey(typeName) {
	return typeName.search(/^[A-Z]/) !== -1;
}

class ContentView extends Component {
	constructor(props) {
		super(props);
		// Only request the content if this is a valid item
		if (props.id) {
			this.props.requestContentItem(props.typeName, props.id);
		}
		this.state = {item: props.item};
		// Look for foreign keys
		_.map(props.contentType.fields, (field, fieldName) => {
			if (isForeignKey(field.type)) {
				this.props.requestContent(field.type);
			}
		});
	}
	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.item, nextProps.item)) {
			this.setState({item: nextProps.item});
		}
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
		// Check if there is an id fo this item.
		// If there is then its an update, else its a new item
		if (this.props.id) {
			this.props.updateContentItem(this.props.typeName, this.state.item);
		}
		else {
			this.props.createContentItem(this.props.typeName, this.state.item);
		}
	}

	onDelete(event) {
		event.preventDefault();
		this.props.deleteContentItem(this.props.typeName, this.state.item);
		this.props.redirect(`/admin/${_.kebabCase(this.props.typeName)}`);
	}

	render() {
		// Iterate through each field in order and generate the editor for that type
		const fieldOrder = this.props.contentType.fieldOrder || [];
		const item = this.state.item || {};

		let fields = fieldOrder.map((fieldName) => {
			let field = this.props.contentType.fields[fieldName];

			return (
				<fieldset key={fieldName}>
					<label htmlFor={fieldName}>{_.startCase(fieldName)}</label>
					<Field
						fieldName={fieldName}
						fieldValue={item[fieldName]}
						fieldDesc={field}
						onChange={this.handleChange.bind(this)} />
				</fieldset>
			);
		});

		return (
			<form className="obs-form" onSubmit={this.saveForm.bind(this)}>
				<div className="obs-toolbar">
					<button type="submit" className="obs-button button-primary">Save</button>
					<button disabled={!this.props.id} onClick={this.onDelete.bind(this)} className="obs-button button-warning">Delete</button>
					<div className="obs-message">{!_.isEqual(this.props.item, this.state.item) ? "Unsaved Content" : null}</div>
				</div>
				{fields}
			</form>
		);
	}
}

function mapStateToProps(state) {
	const type = _.capitalize(state.router.params.type);
	const id = parseInt(state.router.params.id);

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
	createContentItem,
	updateContentItem,
	deleteContentItem,
	redirect
})(ContentView);