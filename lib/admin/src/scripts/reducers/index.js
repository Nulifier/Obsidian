import {combineReducers} from "redux";

import {routerStateReducer} from "redux-router";
import rest from "./rest";

const rootReducer = combineReducers({
	router: routerStateReducer,
	rest
});

export default rootReducer;
