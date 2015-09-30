import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {requestRestDescription} from "../actions";
import _ from "lodash";
import pluralize from "pluralize";

import Menu from "../components/menu";

class App extends Component {
	constructor(props) {
		super(props);
		props.requestRestDescription();
	}

	getPageTitle() {
		const type = this.props.pathParams.type;
		const id = this.props.pathParams.id;
		if (type) {
			if (id) {
				return "Edit " + _.startCase(type);
			}
			else {
				return _.startCase(pluralize(type));
			}
		}
		else {
			return;
		}
	}

	render() {
		const typeNames = _.reject(_.map(this.props.contentTypes, (type, typeName) => {
			// Check if the type is visible
			if (type.visible) {
				return typeName;
			}
		}), _.isUndefined);

		return (
			<div id="layout">
				<a href="#menu" id="menuLink" className="menu-link"><span></span></a>
				<Menu types={typeNames} currentPath={this.props.currentPath} />
				<div id="main">
					<div className="header"><h1>{this.getPageTitle()}</h1></div>
					<div className="content">{this.props.children}</div>
				</div>
			</div>
		);
	};
}

export default connect(state => ({
	contentTypes: state.rest.types,
	currentPath: state.router.location.pathname,
	pathParams: state.router.params
}), {
	requestRestDescription
})(App);
