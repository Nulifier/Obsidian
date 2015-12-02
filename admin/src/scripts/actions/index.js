import {createAction} from "redux-actions";
import Rest from "../api/rest";
import {pushState} from "redux-router";
import _ from "lodash";

// Actions Types
export const REQUEST_REST_DESCRIPTION = "REQUEST_REST_DESCRIPTION";
export const REQUEST_CONTENT = "REQUEST_CONTENT";
export const REQUEST_CONTENT_ITEM = "REQUEST_CONTENT_ITEM";
export const CREATE_CONTENT_ITEM = "CREATE_CONTENT_ITEM";
export const UPDATE_CONTENT_ITEM = "UPDATE_CONTENT_ITEM";
export const DELETE_CONTENT_ITEM = "DELETE_CONTENT_ITEM";

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
export const createContentItem = createAction(
	CREATE_CONTENT_ITEM,
	Rest.createContentItem,
	(type) => {return {type};});
export const updateContentItem = createAction(
	UPDATE_CONTENT_ITEM,
	Rest.updateContentItem,
	(type, item) => {return {type, id: item.id};});
export const deleteContentItem = createAction(
	DELETE_CONTENT_ITEM,
	Rest.destroyContentItem,
	(type, item) => {return {type, id: item.id};});

export const redirect = function(pathName, query) {
	return pushState(null, pathName, query);
}
