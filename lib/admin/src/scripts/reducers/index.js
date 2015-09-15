import {combineReducers} from "redux";

import {routerStateReducer} from "redux-react-router";
import posts from "./posts";

const rootReducer = combineReducers({
	router: routerStateReducer,
	posts
});

export default rootReducer;
