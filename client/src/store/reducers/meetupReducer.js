import {GET_MEETUPS, GET_MEETUP, ADD_MEETUP, UPDATE_MEETUP, DELETE_MEETUP, MEETUPS_LOADING, MEETUP_LOADING} from '../actions/constants';

const initialState = {
    selectedMeetup: null,
    meetups: [],
    loading: false
}

export default function( state = initialState, action) {
    switch(action.type) {
        case GET_MEETUPS:
            return {
                ...state,
                meetups: action.payload,
                loading: false
            };
        case UPDATE_MEETUP:
        case GET_MEETUP:
            return {
                ...state,
                selectedMeetup: action.payload,
                loading: false
            };
        case ADD_MEETUP:
            return {
                ...state,
                meetups: [action.payload, ...state.meetups]
            };
        case DELETE_MEETUP:
            return {
                ...state,
                meetups: state.meetups.filter( (meetup) => meetup._id !== action.payload)
            };
        case MEETUP_LOADING:
        case MEETUPS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}