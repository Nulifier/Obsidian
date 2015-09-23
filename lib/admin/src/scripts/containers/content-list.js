import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Table from "../components/table";
import {Link} from "react-router";
import {requestContent} from "../actions";
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

	render() {
		let typeName = _.kebabCase(this.props.typeName);

		function filterContent(item) {
			return [
				<Link to={`/admin/${typeName}/${item.id}`}>{getContentTitle(item)}</Link>
			];
		}
		
		return (
			<div>
				<div className="obs-toolbar">
					<button className="obs-button">New</button>
				</div>
				<Table filterRow={filterContent} items={this.props.content} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	let type = _.kebabCase(state.router.params.type);

	return {
		typeName: type,
		content: state.rest.content[type] || {}
	};
}

export default connect(mapStateToProps, {
	requestContent
})(ContentList);