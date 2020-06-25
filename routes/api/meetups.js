const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Meetup Model
const Meetup = require('../../models/Meetup');

// @route GET api/meetups/:id
// @description select a Meetup
router.get('/:id', (req,res) => {
    Meetup.findById(req.params.id)
    .then((selectedMeetup) => res.json(selectedMeetup))
    .catch(err => res.status(404).json({success: false}))
  })
  
  
// @route PUT api/meetups/:id
// @description Update an Meetup
router.put('/:id', (req,res) => {
  var body = req.body

  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide data to update',
      })
  }

  if(body.participants){
    Meetup.findById({ _id: body._id })
    .then((selectedMeetup) => {

      if( selectedMeetup.participantLimit && 
          selectedMeetup.participants.length == selectedMeetup.participantLimit && 
          !selectedMeetup.participants.includes(body.participants)) 
            return res.json({
              success: false,
              error: 'Participant limit has been reached!',
            });
            console.log("selectedMeetup.participants", selectedMeetup.participants.length)
      if (selectedMeetup.participants.length && selectedMeetup.participants.includes(body.participants)) {
        body.participants = selectedMeetup.participants.filter((participant) => participant != body.participants);
        body.participantsNames = selectedMeetup.participantsNames.filter((participant) => participant != body.participantsNames);
      }
      else { 
        body.participants = [...selectedMeetup.participants, body.participants ];
        body.participantsNames = [...selectedMeetup.participantsNames, body.participantsNames ];
      }
      update();
    })
  } else update();

  async function update() {
    await Meetup.findByIdAndUpdate({ _id: req.params.id }, body, (err, user) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'User not found!',
          })
      } else return res.status(200).json({
          user,
          message: 'User updated!',
      })
    })
  }
});

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