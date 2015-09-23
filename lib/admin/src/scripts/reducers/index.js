import {combineReducers} from "redux";

import {routerStateReducer} from "redux-react-router";
import rest from "./rest";

const rootReducer = combineReducers({
	router: routerStateReducer,
	rest
});

export default rootReducer;
