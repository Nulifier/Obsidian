require("babel-core/polyfill");

// React
import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";

// Binding React Router to Redux
import {ReduxRouter} from "redux-router";

import configureStore from "./store/configureStore";
import {loadMenuToggle} from "./menu-toggle";

let DevTools, DebugPanel, LogMonitor;
if (process.env.NODE_ENV !== "production") {
	let reduxDevTools = require("redux-devtools/lib/react");

	DevTools = reduxDevTools.DevTools;
	DebugPanel = reduxDevTools.DebugPanel;
	LogMonitor = reduxDevTools.LogMonitor
}

// Create the store
const store = configureStore();

// Render the root component
ReactDOM.render(
	<div>
		<Provider store={store}>
			<ReduxRouter />
		</Provider>
		(process.env.NODE_ENV !== "production" ?
			(
				<DebugPanel top right bottom>
					<DevTools store={store} monitor={LogMonitor} />
				</DebugPanel>
			) : null
		)
	</div>,
	document.getElementById("react-app")
);

// Enable toggling of the main menu
loadMenuToggle(window, window.document);
