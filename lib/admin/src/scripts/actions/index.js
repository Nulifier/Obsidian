import {createAction} from "redux-actions";
import Rest from "../api/rest";
import _ from "lodash";

// Actions Types
export const REQUEST_REST_DESCRIPTION = "REQUEST_REST_DESCRIPTION";
export const REQUEST_CONTENT = "REQUEST_CONTENT";
export const REQUEST_CONTENT_ITEM = "REQUEST_CONTENT_ITEM";
export const SAVE_CONTENT_ITEM = "SAVE_CONTENT_ITEM";

// Action Creators
export const requestRestDescription = createAction(
	REQUEST_REST_DESCRIPTION,
	Rest.requestDescription);
export const requestContent = createAction(
	REQUEST_CONTENT,
	Rest.requestContent,
	(type) => {return {type};});
export const requestContentItem = createAction(
	REQUEST_CONTENT_ITEM,
	Rest.requestContentItem,
	(type, id) => {return {type, id};});
export const saveContentItem = createAction(
	SAVE_CONTENT_ITEM,
	Rest.updateContentItem,
	(type, item) => {return {type, id: item.id};});
