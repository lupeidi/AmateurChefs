import { combineReducers } from 'redux';

import meetupReducer from './meetupReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    user: userReducer,
    meetup: meetupReducer,
    error: errorReducer,
    auth: authReducer
});