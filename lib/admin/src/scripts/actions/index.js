import {createAction} from "redux-actions";
import Posts from "../api/posts";

// Actions Types
export const REQUEST_POSTS = "REQUEST_POSTS";
export const SAVE_POST = "SAVE_POST";

export const requestPosts = createAction(REQUEST_POSTS, Posts.findAll);
export const savePost = createAction(SAVE_POST, Posts.update);
