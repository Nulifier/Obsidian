import React, {Component} from "react";
import {connect} from "react-redux";
import Table from "../components/table";
import {Link} from "react-router";
import {requestContent, redirect} from "../actions";
import _ from "lodash";
import {getContentTitle} from "../util";

class ContentList extends Component {
	constructor(props) {
		super(props);
		this.requestContent(props.typeName);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.typeName !== nextProps.typeName) {
			this.requestContent(nextProps.typeName);
		}
	}
	requestContent(type) {
		this.props.requestContent(type);
	}

	onNewItem(event) {
		event.preventDefault();
		this.props.redirect(`/admin/${_.kebabCase(this.props.typeName)}/new`)
	}

	render() {
		function filterContent(item) {
			return [
				<Link to={`/admin/${_.kebabCase(this.props.typeName)}/${item.id}`}>{getContentTitle(item)}</Link>
			];
		}
		
		return (
			<div>
				<div className="obs-toolbar">
					<button onClick={this.onNewItem.bind(this)} className="obs-button">New</button>
				</div>
				<Table filterRow={filterContent.bind(this)} items={this.props.content} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const type = _.capitalize(state.router.params.type);

	return {
		typeName: type,
		content: state.rest.content[type] || {}
	};
}

export default connect(mapStateToProps, {
	requestContent,
	redirect
})(ContentList);