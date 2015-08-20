import React from "react";
import ReactDOM from "react-dom";
import {combineReducers, createStore} from "redux";
import {Router, Route} from "react-router";
import {history} from "react-router/lib/BrowserHistory";
import {reduxRouteComponent, routerStateReducer} from "redux-react-router";

import App from "./containers/app";
import * as reducers from "./reducers";
import PostList from "./components/post-list";

const adminApp = combineReducers(reducers);
const store = createStore(adminApp);

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

(function (window, document) {
	let layout = document.getElementById("layout");
	let menu = document.getElementById("menu");
	let menuLink = document.getElementById("menuLink");

	function toggleClass(element, className) {
		let classes = element.className.split(/\s+/);
		let length = classes.length;
		let i = 0;

		for (; i < length; ++i) {
			if (classes[i] === className) {
				classes.splice(i, 1);
				break;
			}
		}

		if (length === classes.length) {
			classes.push(className);
		}

		element.className = classes.join(" ");
	}

	menuLink.onclick = function(e) {
		var active = "active";

		e.preventDefault();
		toggleClass(layout, active);
		toggleClass(menu, active);
		toggleClass(menuLink, active);
	};
}(window, window.document));
