import React, {Component} from "react";
import {connect} from "react-redux";
import Table from "../components/table";

class MediaManager extends Component {
	render() {
		function filterMediaRow(item) {

		}

		return (
			<div>
				<div className="obs-toolbar">
					<button>Add Media</button>
				</div>
				<Table filterRow={filterMediaRow} items={[]} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {

})(MediaManager);