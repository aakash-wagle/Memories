import { AUTH, LOGOUT } from "../constants/actionTypes";

// The parameters are state, action. 'posts' is the state
export default function authReducer(state = { authData: null }, action) {
  switch (action.type) {
    case AUTH:
      // console.log(action.payload);
      localStorage.setItem("profile", JSON.stringify(action.payload));  // ...action.payload
      return {...state, authData: action.payload};
    case LOGOUT:
      // console.log(action.payload);
      localStorage.removeItem("profile")
      return {...state, authData: null};
    default:
      return state;
  }
}
