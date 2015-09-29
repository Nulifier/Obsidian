import u from "updeep";
import _ from "lodash";
import {
	START,
	REQUEST_REST_DESCRIPTION,
	REQUEST_CONTENT,
	REQUEST_CONTENT_ITEM,
	CREATE_CONTENT_ITEM,
	UPDATE_CONTENT_ITEM,
	DELETE_CONTENT_ITEM
} from "../actions";

global.u = u;

function isError(action) {
	return action.error === true;
}

// State Description for the Rest Interface
/*
{
	rest: {
		types: {
			User: {
				fields: {
					firstName: {
						type: "string"
					},
					lastName: {
						type: "string"
					}
				},
				fieldOrder: ["firstName", "lastName"]
			}
		},
		content: {
			user: {
				1: {// Fields}
			}
		}
	}
}
*/
const defaultState = {
	types: {},
	content: {}
};

export default function rest(state = defaultState, action) {
	if (isError(action)) {
		// TODO: Add error handling, this will trigger for each reducer... fix that
		console.log("Error with action: " + action.type);
		return state;
	}

	switch (action.type) {
	case REQUEST_REST_DESCRIPTION:
		return u({
			types: action.payload
		}, state);

	case REQUEST_CONTENT:
		let content = _.zipObject(_.pluck(action.payload, "id"), action.payload);
		return u({
			content: {
				[action.meta.type]: u.constant(content)
			}
		}, state);

	case REQUEST_CONTENT_ITEM:
	case CREATE_CONTENT_ITEM:
	case UPDATE_CONTENT_ITEM:
		// A create action won't have an id in the meta field
		const id = action.meta.id || action.payload.id

		// Check if that type doesn't exist yet
		if (!state.content[action.meta.type]) {
			// Create the type
			return u({
				content: {
					[action.meta.type]: u.constant({
						[id]: action.payload
					})
				}
			}, state);
		}
		else {
			return u({
				content: {
					[action.meta.type]: {
						[id]: u.constant(action.payload)
					}
				}
			}, state);
		}

	case DELETE_CONTENT_ITEM:
		return u({
			content: {
				[action.meta.type]: u.omit(action.meta.id)
			}
		}, state);

	}
	return state;
}
