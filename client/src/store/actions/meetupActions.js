import axios from 'axios';
import {GET_MEETUPS, GET_MEETUP, ADD_MEETUP, UPDATE_MEETUP, DELETE_MEETUP, MEETUPS_LOADING, MEETUP_LOADING} from './constants';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const attendMeetup = (userId, meetupId) => ( dispatch, getState ) => {
    axios
    .get(`api/meetups/${meetupId}`, tokenConfig(getState))
    .then( res => 
        dispatch({ 
            type: UPDATE_MEETUP,
            payload: userId
        }))
    .catch( err => 
        dispatch(returnErrors(err.response.data, err.response.status)))
};

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