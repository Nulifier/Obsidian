import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import {devTools} from "redux-devtools";
import rootReducer from "../reducers";

const createStoreWithMiddleware = compose(
	applyMiddleware(thunkMiddleware, promiseMiddleware),
	devTools()
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("../reducers", () => {
			const nextRootReducer = require("../reducers");
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}