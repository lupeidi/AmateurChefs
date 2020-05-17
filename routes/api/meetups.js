const express = require('express');
const router = express.Router();

// Meetup Model
const Meetup = require('../../models/Meetup');

// @route GET api/meetups
// @description Get All meetups
router.get('/', (req,res) => {
    Meetup.find()
    .sort({ date: -1 })
    .then(meetups => res.json(meetups))
});

// @route POST api/meetups
// @description Create a Meetup
router.post('/', (req,res) => {
    const newMeetup = new Meetup({
        name: req.body.name,
        location: req.body.location,
    })

    newMeetup.save()
    .then(meetups => res.json(meetups))
});

// @route DELETE api/meetups/:id
// @description Delete a Meetup
router.delete('/:id', (req,res) => {
    Meetup.findById(req.params.id)
    .then(meetup => 
        meetup.remove()
        .then(() => res.json({success: true})) )
    .catch(err => res.status(404).json({success: false}))
});


// @route GET api/meetups
// @description Get All items
router.get('/', (req,res) => {
    Meetup.find()
    .sort({ date: -1 })
    .then(meetups => res.json(meetups))
});


module.exports = router;