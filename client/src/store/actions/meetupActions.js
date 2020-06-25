import axios from 'axios';
import {GET_MEETUPS, GET_MEETUP, ADD_MEETUP, UPDATE_FAIL, DELETE_MEETUP, MEETUPS_LOADING, MEETUP_LOADING, UPDATE_SUCCESS} from './constants';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const updateMeetup = ({ _id, name, location, description, requirements, coverPicture }) => ( dispatch ) => {

    const config = {
    headers: {
    'Content-Type': 'application/json'
    }
    };

    // Request body
    const body = JSON.stringify({ _id, name, location, description, requirements, coverPicture });

    axios
        .put(`api/meetups/${_id}`, body, config)
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

export const attendMeetup = ( _id, participants, participantsNames ) => ( dispatch, getState ) => {

    // Request body
    const body = JSON.stringify({ _id, participants, participantsNames });
    axios
        .put(`api/meetups/${_id}`, body, tokenConfig(getState))
        .then(res => { 
            dispatch(setMeetupsLoading());
            axios
            .get('/api/meetups')
            .then((res) => 
                dispatch({ 
                    type: GET_MEETUPS,
                    payload: res.data
                }))
            .catch( err => 
                dispatch(returnErrors(err.response.data, err.response.status)))
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

export const getMeetups = () => dispatch => {
    dispatch(setMeetupsLoading());
    axios
    .get('/api/meetups')
    .then((res) => 
        dispatch({ 
            type: GET_MEETUPS,
            payload: res.data
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

export const getMeetup = (id) => dispatch => {

    dispatch(setMeetupsLoading());

    axios
    .get(`/api/meetups/${id}`)
    .then((res) => 
        dispatch({ 
            type: GET_MEETUP,
            payload: res.data
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

export const addMeetup = (meetup) => ( dispatch, getState ) => {
    axios
    .post('/api/meetups', meetup, tokenConfig(getState))
    .then((res) => 
        dispatch({ 
            type: ADD_MEETUP,
            payload: res.data
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteMeetup = (id) => ( dispatch, getState ) => {
    axios
    .delete(`api/meetups/${id}`, tokenConfig(getState))
    .then( res => 
        dispatch({ 
            type: DELETE_MEETUP,
            payload: id
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

export const setMeetupLoading = () => {
    return {
        type: MEETUP_LOADING
    };
};

export const setMeetupsLoading = () => {
    return {
        type: MEETUPS_LOADING
    };
};