require("babel-core/polyfill");
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route} from "react-router";
import {history} from "react-router/lib/BrowserHistory";
import {reduxRouteComponent} from "redux-react-router";
import configureStore from "./store/configureStore";
import {loadMenuToggle} from "./menu-toggle";
import {DevTools, DebugPanel, LogMonitor} from "redux-devtools/lib/react";

// React Components
import App from "./containers/app";
import PostList from "./containers/post-list";
import Post from "./containers/post";

// Create the store
const store = configureStore();

// Render the root component
ReactDOM.render(
	<div>
		<Router history={history}>
			<Route component={reduxRouteComponent(store)}>
				<Route path="/admin" component={App}>
					<Route path="users" />
					<Route path="posts" component={PostList} />
					<Route path="posts/:postId" component={Post} />
				</Route>
			</Route>
		</Router>
		<DebugPanel top right bottom>
			<DevTools store={store} monitor={LogMonitor} />
		</DebugPanel>
	</div>,
	document.getElementById("react-app")
);

// Enable toggling of the main menu
loadMenuToggle(window, window.document);
