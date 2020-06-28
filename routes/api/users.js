const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route GET api/users
// @description Get All users
router.get('/', (req,res) => {
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
});

// @route GET api/users
// @description Get One User
router.get('/:id', (req,res) => {
    User.findById(req.params.id)
    .then((selectedUser) => res.json(selectedUser))
    .catch(err => res.status(404).json({success: false}))
  })

// @route POST api/users
// @description Create an User
router.post('/', (req,res) => {

    const { firstName, lastName, email, password, location, dateofBirth, gender, profilePicture } = req.body;
    // const profilePicture = req.file.path;

    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({ email })
        .then( user => {
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                firstName,
                lastName, 
                email, 
                password,
                location, 
                profilePicture
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        firstName: user.firstName,
                                        lastName: user.lastName, 
                                        email: user.email, 
                                        password: user.password,
                                        location: user.location, 
                                        profilePicture: user.profilePicture,
                                    }
                                })

                            }
                        )

                    })
                })
            })
        })
});

// @route DELETE api/users/:id
// @description Delete an User
router.delete('/:id', (req,res) => {
    User.findById(req.params.id)
    .then(user => 
        user.remove()
        .then(() => res.json({success: true})) )
    .catch(err => res.status(404).json({success: false}))
});

// @route PUT api/users/:id
// @description Update an User
router.put('/:id', (req,res) => {
    var body = req.body
console.log("userbody", body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide data to update',
        })
    }

    if(body.historyOfEvents)     
        {console.log("history");
        User.findById({ _id: body._id })
        .then((selectedUser) => {
            if (selectedUser.historyOfEvents.length && selectedUser.historyOfEvents.includes(body.historyOfEvents)) {
                console.log("if");
                body.historyOfEvents = selectedUser.historyOfEvents.filter((participant) => participant != body.historyOfEvents);
                // body.eventsNames = selectedUser.eventsNames.filter((participant) => participant != body.eventsNames);
            }
            else { 
                console.log("else");
                body.historyOfEvents = [...selectedUser.historyOfEvents, body.historyOfEvents ];
                // body.eventsNames = [...selectedUser.eventsNames, body.eventsNames ];
            }
            update();
        })};

    if(body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(body.password, salt, (err, hash) => {
                if(err) throw err;
                body.password = hash;
                update();
            })
        })
    } else update();
    
    async function update(){
    console.log("update")   
        await User.findByIdAndUpdate({ _id: req.params.id }, body, (err, user) => {
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

// @route GET api/users
// @description Get All items
router.get('/', (req,res) => {
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
});

module.exports = router;