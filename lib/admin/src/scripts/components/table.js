import React, {Component, PropTypes} from "react";

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
			<table className="pure-table pure-table-striped">
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>State</th>
				</tr>
			</thead>
			<tbody>
				{this.props.items.map(this.renderRow, this)}
			</tbody>
			</table>
		);
	}
};

Table.propTypes = {
	filterRow: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired
};
