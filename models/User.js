const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    location:{
        type: String
    },
    dateofBirth:{
        type: Date
    },
    gender:{
        type: String
    },
    profilePicture:{
        type: String
    }
})

module.exports = User = mongoose.model('user', UserSchema);