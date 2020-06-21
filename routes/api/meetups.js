const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Meetup Model
const Meetup = require('../../models/Meetup');

// Get Single Meetup
router.get('/:id', (req,res) => {
    Meetup.findById(req.params.id)
    .then((selectedMeetup) => res.json(selectedMeetup))
    .catch(err => res.status(404).json({success: false}))
  })
  
  
  // Update Meetup
  router.put('/:id', (req,res) => {
    Meetup.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);

      } else {
        res.json(data)
        console.log('Meetup updated successfully !')
      }
    })
  })

// @route GET api/meetups
// @description Get All meetups
// @access Public
router.get('/', (req,res) => {
    Meetup.find()
    .sort({ date: -1 })
    .then(meetups => res.json(meetups))
});

// @route POST api/meetups
// @description Create a Meetup
// @access Private
router.post('/', auth, (req,res) => {
    const newMeetup = new Meetup({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        date: req.body.date,
        participantLimit: req.body.participantLimit,
        requirements: req.body.requirements,
        coverPicture: req.body.coverPicture,
    })

    newMeetup.save()
    .then(meetups => res.json(meetups))
});

// @route DELETE api/meetups/:id
// @description Delete a Meetup
// @access Private
router.delete('/:id', auth, (req,res) => {
    Meetup.findById(req.params.id)
    .then(meetup => 
        meetup.remove()
        .then(() => res.json({success: true})) )
    .catch(err => res.status(404).json({success: false}))
});


module.exports = router;