import {routerStateReducer} from "redux-react-router";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
	router: routerStateReducer
});

export default rootReducer;
