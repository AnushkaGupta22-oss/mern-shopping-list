import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {

  console.log("AUTH ACTION:", action.type);

  switch (action.type) {

    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log("REGISTER_SUCCESS PAYLOAD:", action.payload);

      localStorage.setItem("token", action.payload.token);

      console.log("LOCAL STORAGE TOKEN:", localStorage.getItem("token"));

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false
      };

    case LOGOUT_SUCCESS:
      console.log("LOGOUT REDUCER");

      localStorage.removeItem("token");

      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");

      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
}