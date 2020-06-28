const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    location:{
        type: String
    },
    profilePicture:{ 
        type: String 
    },
    historyOfEvents:{
        type: Array
    },
    eventsNames:{
        type: Array
    },
})

module.exports = User = mongoose.model('user', UserSchema);