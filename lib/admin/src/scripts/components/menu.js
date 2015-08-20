import React, {Component, PropTypes} from "react";
import {Link} from "react-router";

export default class Menu extends Component {
	render() {
		let lists = [
			"Users",
			"Posts"
		];

		function makeMenuItem(key, path, title) {
			return (<li key={key} className="pure-menu-item"><Link className="pure-menu-link" to={path} title={title}>{title}</Link></li>);
		}

		let children = lists.map((list) => {
			return makeMenuItem(list, "/admin/"+list.toLowerCase(), list);
		});

		return (
			<div id="menu">
				<div className="pure-menu">
					<ul className="pure-menu-list">
						<Link className="pure-menu-heading" to="/admin">Obsidian</Link>
						{children}
					</ul>
				</div>
			</div>
		);
	}
}
