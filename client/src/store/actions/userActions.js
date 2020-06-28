import axios from 'axios';
import { GET_USERS, UPDATE_USER, USERS_LOADING, DELETE_USER} from './constants';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import {  
    UPDATE_SUCCESS,
    UPDATE_FAIL,
  } from './constants';

export const getUsers = () => dispatch => {
    dispatch(setUsersLoading());
    axios
    .get('/api/users')
    .then((res) => 
        dispatch({ 
            type: GET_USERS,
            payload: res.data
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

export const getUser = (id) => dispatch => {

    dispatch(setUsersLoading());

    axios
    .get(`/api/users/${id}`)
    .then((res) => 
        dispatch({ 
            type: UPDATE_USER,
            payload: res.data
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

export const deleteUser = (id) => ( dispatch, getState ) => {
    axios
    .delete(`api/users/${id}`, tokenConfig(getState))
    .then( res => 
        dispatch({ 
            type: DELETE_USER,
            payload: id
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};

export const updateUser = ({ _id, firstName, lastName, email, password, location, dateofBirth, gender, profilePicture }) => ( dispatch ) => {

    const config = {
    headers: {
    'Content-Type': 'application/json'
    }
    };

    // Request body
    const body = JSON.stringify({ _id, firstName, lastName, email, password, location, dateofBirth, gender, profilePicture });

    axios
        .put(`api/users/${_id}`, body, config)
        .then(res =>{
            dispatch({
                type: UPDATE_SUCCESS,
                payload: res.data
            })
        }
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'UPDATE_FAIL')
            );
            dispatch({
                type: UPDATE_FAIL
            });
        });
}

export const userAttendMeetup = ( _id, historyOfEvents ) => ( dispatch, getState ) => {

    // Request body
    const body = JSON.stringify({ _id, historyOfEvents });
    console.log("body", body)
    axios
        .put(`api/users/${_id}`, body, tokenConfig(getState))
        .then(res => { 
            dispatch(setUsersLoading());
            axios
            .get('/api/users')
            .then((res) => 
                dispatch({ 
                    type: GET_USERS,
                    payload: res.data
                }))
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'UPDATE_FAIL')
            );
            dispatch({
                type: UPDATE_FAIL
            });
        });
}