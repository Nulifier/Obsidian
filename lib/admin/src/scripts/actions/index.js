import {createAction} from "redux-actions";
import Rest from "../api/rest";
import Posts from "../api/posts";

// Actions Types
export const REQUEST_REST = "REQUEST_REST";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const SAVE_POST = "SAVE_POST";
export const DELETE_POST = "DELETE_POST";

// Action Creators
export const requestRest = createAction(REQUEST_REST, Rest.query);

export const requestPosts = createAction(REQUEST_POSTS, Posts.findAll);
export const savePost = createAction(SAVE_POST, Posts.update);
export const deletePost = createAction(DELETE_POST, Posts.destroy);
