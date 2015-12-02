import React, {Component, PropTypes} from "react";
import _ from "lodash";

export default class Table extends Component {
	renderRow(rowData) {
		return (
			<tr key={rowData.id}>
				{this.props.filterRow(rowData).map((item, index) => {
					return <td key={index}>{item}</td>;
				})}
			</tr>
		);
	}

	render() {
		return (
			<table className="obs-table">
			<thead>
				<tr>
					<th>Title</th>
				</tr>
			</thead>
			<tbody>
				{_.map(this.props.items, this.renderRow, this)}
			</tbody>
			</table>
		);
	}
};

Table.propTypes = {
	filterRow: PropTypes.func.isRequired,
	items: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.objectOf(PropTypes.object)
	]).isRequired
};
