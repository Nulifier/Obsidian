import React, {Component, PropTypes} from "react";

export default class List extends Component {
	render() {
		return (
			<table className="pure-table pure-table-striped">

			</table>
		);
	}
};

List.propTypes = {
	renderItem: PropTypes.func.isRequired
};
