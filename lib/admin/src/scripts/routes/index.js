import React from "react";
import {Route, IndexRoute} from "react-router";

// React Components
import App from "../containers/app";
import PostList from "../containers/post-list";
import Post from "../containers/post";

export default (
	<Route path="/admin" component={App}>
		<IndexRoute />
		<Route path="users" />
		<Route path="posts" component={PostList} />
		<Route path="posts/:postId" component={Post} />
	</Route>
);