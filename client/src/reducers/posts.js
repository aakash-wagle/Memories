import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

// The parameters are state, action. 'posts' is the state
export default function reducer(posts = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        action.payload._id === post._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => action.payload !== post._id);
    default:
      return posts;
  }
}
