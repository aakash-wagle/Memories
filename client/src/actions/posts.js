import * as api from "../api"; // we do an import all as a lot of calls are going to be imported and used as 'api.callName'
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

// Action Creators - functions that return actions

// We use redux thunk since we're dealing with asynchronous logic.
// We just add 'async (dispatch) =>' to the action creator and instead of 'return action' we do 'dispatch(action)'
export const getPosts = () => async (dispatch) => {
  try {
    // const response = await api.fetchPosts();
    // console.log(response);
    // const action = { type: "FETCH_ALL", payload: response.data };
    //api.fetchPosts() returns a response which always has the data object which we return from the backend. We destructure teh response to obtain the data object directly
    const { data } = await api.fetchPosts();
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);  
    dispatch({ type: UPDATE, payload: data });  // payload is the updated post
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });  // payload is the id
  } catch (error) {
    console.log(error.message);
  }
};

// export const likePost = (id, post) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id);  
//     dispatch({ type: "UPDATE", payload: data });  // payload is the likeCount
//   } catch (error) {
//     console.log(error.message);
//   }
// };