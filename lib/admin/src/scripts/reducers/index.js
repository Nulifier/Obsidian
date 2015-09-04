import {routerStateReducer} from "redux-react-router";
import {combineReducers} from "redux";
import {REQUEST_POSTS, SAVE_POST} from "../actions";
import u from "updeep";
import _ from "lodash";

global.u = u;

function isError(action) {
	return action.error === true;
}

function posts(state = {items: []}, action) {
	switch (action.type) {
	case REQUEST_POSTS:
		if (isError(action)) {
			// TODO: Add error handling
			console.log("Error requesting posts");
			break;
		}
		else {
			return u({
				items: action.payload
			}, state);
		}
	case SAVE_POST:
		if (isError(action)) {
			// TODO: Add error handling
			console.log("Error saving post");
			break;
		}
		else {
			// Find the index of the post
			let index = _.findIndex(state.items, (post) => {return post.id === action.payload.id});

			if (index === -1) {
				// Post doesn't exist
				return state;
			}

			return u.updateIn("items", {
				[index]: action.payload
			}, state);
		}
	}
	return state;
}

const rootReducer = combineReducers({
	router: routerStateReducer,
	posts
});

export default rootReducer;
