import axios from 'axios';
import { returnErrors } from './errorAction';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING } from "./type";
 

//check token and load user
export const loadUser =  () => (dispatch, getState) => {
    //USer LOading
    dispatch({ type: USER_LOADING });

    
    axios.get('/api/auth/user', tokenConfig(getState) )
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ 
            type: AUTH_ERROR
        });
    });
};
//setup config/headers and token
export const tokenConfig = getState => {
    //Get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config ={
        headers: {
            "Content-Type": "application/json"
        }
    }

    //if token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;

    }
    return config;

}