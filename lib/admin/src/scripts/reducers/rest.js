import u from "updeep";
import _ from "lodash";
import {START, REQUEST_REST_DESCRIPTION, REQUEST_CONTENT, REQUEST_CONTENT_ITEM, SAVE_CONTENT_ITEM} from "../actions";

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
		// Check if that type doesn't exist yet
		if (!state.content[action.meta.type]) {
			// Create the type
			return u({
				content: {
					[action.meta.type]: u.constant({
						[action.meta.id]: action.payload
					})
				}
			}, state);
		}
		else {
			return u({
				content: {
					[action.meta.type]: {
						[action.meta.id]: u.constant(action.payload)
					}
				}
			}, state);
		}

	case SAVE_CONTENT_ITEM:
		return u({
			content: {
				[action.meta.type]: {
					[action.meta.id]: u.constant(action.payload)
				}
			}
		}, state);

	}
	return state;
}
