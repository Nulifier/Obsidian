import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import Table from "../components/table";
import {Link} from "react-router";

class PostList extends Component {
	render() {
		function filterPost(post) {
			return [
				<Link to={`/admin/posts/${post.id}`}>{post.title}</Link>,
				post.author_id,
				post.state
			];
		}

		return (
			<Table filterRow={filterPost} items={this.props.posts} />
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.items
	};
}

export default connect(mapStateToProps)(PostList);
