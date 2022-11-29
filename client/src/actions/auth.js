import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

// const navigate = useNavigate(); this does not work as useNavigate() can only be used inside a Router context

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    
    dispatch({type: AUTH, payload: data})

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    
    dispatch({type: AUTH, payload: data})

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
