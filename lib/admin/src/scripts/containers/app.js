import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {requestRestDescription} from "../actions";
import _ from "lodash";

import Menu from "../components/menu";

class App extends Component {
	componentDidMount() {
		this.props.requestRestDescription();
	}

	render() {
		let typeNames = _.keys(this.props.contentTypes);

		return (
			<div id="layout">
				<a href="#menu" id="menuLink" className="menu-link"><span></span></a>
				<Menu types={typeNames} currentPath={this.props.currentPath} />
				<div id="main">
					<div className="header"><h1>Page Title</h1></div>
					<div className="content">{this.props.children}</div>
				</div>
			</div>
		);
	};
}

export default connect(state => ({
	contentTypes: state.rest.types,
	currentPath: state.router.location.pathname
}), {
	requestRestDescription
})(App);
