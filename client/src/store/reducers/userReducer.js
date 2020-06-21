import { GET_USERS, GET_USER, DELETE_USER, USERS_LOADING, UPDATE_FAIL, UPDATE_SUCCESS } from '../actions/constants';

const initialState = {
    users: [],
    loading: false
}

export default function( state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                selectedUser: action.payload,
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter( (user) => user._id !== action.payload)
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
            case UPDATE_SUCCESS:
                return {
                    ...state,
                    loading: true
                };
            case UPDATE_FAIL:
                return {
                    ...state,
                    loading: true
                };
        default:
            return state;
    }
}