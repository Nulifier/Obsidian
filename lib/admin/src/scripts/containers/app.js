import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import Menu from "../components/menu";

class App extends Component {
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

export default connect(state => state)(App);
