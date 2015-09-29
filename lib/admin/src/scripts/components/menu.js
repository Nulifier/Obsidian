import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import pluralize from "pluralize";
import _ from "lodash";

export default class Menu extends Component {
	render() {
		let currentType = (/\/admin\/(\w+)/.exec(this.props.currentPath) || [])[1] || "";

		function makeMenuItem(path, title) {
			return (<li className={path === currentType ? "selected" : null} key={title}><Link to={"/admin/" + path} title={title}>{title}</Link></li>);
		}

		let children = this.props.types.map((list) => {
			return makeMenuItem(list.toLowerCase(), _.startCase(pluralize(list)));
		});

		return (
			<div className="obs-menu">
				<ul>
					<Link className="obs-menu-heading" to="/admin">Obsidian</Link>
					{children}
				</ul>
			</div>
		);
	}
}
