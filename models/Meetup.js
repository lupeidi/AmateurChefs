const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MeetupSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    location:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    participantLimit:{
        type: Number
    },
    participants:{
        type: Array,
    },
    participantsNames:{
        type: Array,
    },
    requirements:{
        type: String
    },
    coverPicture:{
        type: String
    },

})

module.exports = Meetup = mongoose.model('meetup', MeetupSchema);