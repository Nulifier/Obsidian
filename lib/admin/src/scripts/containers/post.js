import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {savePost} from "../actions";
import _ from "lodash";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = this.makeState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.makeState(nextProps));
	}

	makeState(props) {
		return {
			post: props.post
		};
	}

	createChangeHandler(field) {
		return (event) => {
			let newPost = Object.assign({}, this.state.post);
			newPost[field] = event.target.value;
			this.setState({
				post: newPost
			});
		};
	}

	saveForm(event) {
		event.preventDefault();
		this.props.savePost(this.state.post);
	}

	render() {
		let post = this.state.post || {};
		return (
			<form className="pure-form pure-form-stacked" onSubmit={this.saveForm.bind(this)}>
				<button type="submit" className="pure-button pure-button-primary">Save</button>
				<button className="pure-button button-warning">Delete</button>

				<label htmlFor="title">Title</label>
				<input id="title" type="text" placeholder="Enter a title" value={post.title} onChange={this.createChangeHandler("title")} />

				<label htmlFor="state">State</label>
				<select id="state" placeholder="Select a state" value={post.state} onChange={this.createChangeHandler("state")}>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
					<option value="archived">Archived</option>
				</select>

				<label htmlFor="content">Content</label>
				<textarea style={{width: "40em", height: "80em"}} value={post.content} onChange={this.createChangeHandler("content")} />
			</form>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let postId = parseInt(ownProps.params.postId);
	let post = _.find(state.posts.items, (post) => {
		return post.id === postId;
	});

	return {
		postId,
		post
	};
}

function mapDispatchToProps(dispatch) {
	return {
		savePost: (post) => dispatch(savePost(post))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
