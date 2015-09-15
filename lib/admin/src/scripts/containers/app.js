import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {requestRest, requestPosts} from "../actions";

import Menu from "../components/menu";

class App extends Component {
	componentWillMount() {
		this.props.requestRest();
		this.props.requestPosts();
	}

	render() {
		return (
			<div id="layout">
				<a href="#menu" id="menuLink" className="menu-link"><span></span></a>
				<Menu />
				<div id="main">
					<div className="header"><h1>Page Title</h1></div>
					<div className="content">{this.props.children}</div>
				</div>
			</div>
		);
	};
}

export default connect(state => ({
	routerState: state.router
}), {
	requestRest,
	requestPosts
})(App);
