import React from "react";
import {Route, IndexRoute} from "react-router";
import _ from "lodash";

// React Components
import App from "../containers/app";
import MediaManager from "../containers/media-manager";
import ContentList from "../containers/content-list";
import ContentView from "../containers/content-view";

export default (
	<Route path="/admin" component={App}>
		<IndexRoute />
		<Route path="media" component={MediaManager} />
		<Route path=":type" component={ContentList} />
		<Route path=":type/:id" component={ContentView} />
	</Route>
);