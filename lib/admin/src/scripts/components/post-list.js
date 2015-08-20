import React, {Component, PropTypes} from "react";

export default class PostList extends Component {
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
				<tr><td>A good post</td><td>Bob</td><td>Published</td></tr>
				<tr><td>Another post</td><td>Bob</td><td>Published</td></tr>
				<tr><td>The best post</td><td>Bob</td><td>Published</td></tr>
			</tbody>
			</table>
		);
	}
}
