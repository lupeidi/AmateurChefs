import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './constants';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({ type: USER_LOADING });

    

    axios.get('./api/auth/user', tokenConfig(getState))
    .then( res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch( returnErrors(err.response.data, err.response.status) )
        dispatch({
            type: AUTH_ERROR
        })
    })
};

// Register User
export const register = ({ firstName, lastName, email, password, location, dateofBirth, gender, profilePicture }) => dispatch => {

    // Headers
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    };

  // Request body
  const body = JSON.stringify({ firstName, lastName, email, password, location, dateofBirth, gender, profilePicture });

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
}


// Setup config/headers and token
export const tokenConfig = getState => {
  //Get token from local storage
  const token = getState().auth.token;
  
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  
  //If token , add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}

// Login User
export const login = ({ email, password }) => dispatch => {

  // Headers
  const config = {
      headers: {
      'Content-Type': 'application/json'
      }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
}

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};