import React from "react";
import ReactDOM from "react-dom";
import {Router, Route} from "react-router";
import {history} from "react-router/lib/BrowserHistory";
import {reduxRouteComponent} from "redux-react-router";
import configureStore from "./store/configureStore";

// React Components
import App from "./containers/app";
import PostList from "./components/post-list";

// Create the store
const store = configureStore();

// Render the root component
ReactDOM.render(
	<Router history={history}>
		<Route component={reduxRouteComponent(store)}>
			<Route path="/admin" component={App}>
				<Route path="users" />
				<Route path="posts" component={PostList} />
			</Route>
		</Route>
	</Router>,
	document.getElementById("react-app")
);

// Enable toggling of the main menu
require("./menu-toggle")(window, window.document);
