const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });
  
//   const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
//   });

// User Model
const User = require('../../models/User');

// @route GET api/users
// @description Get All users
router.get('/', (req,res) => {
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
});

// Get Single User
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
                dateofBirth, 
                gender, 
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
                                        dateofBirth: user.dateofBirth, 
                                        gender: user.gender, 
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
// @description Edit an User
router.put('/:id', (req,res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide data to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        // user.name = body.name

        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
});

// @route GET api/users
// @description Get All items
router.get('/', (req,res) => {
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
});

// @route POST api/users/update/:id
// @description Update an User
router.post('/users/update/:id', (req, res) => {
    const { firstName, lastName, email, password, location, dateofBirth, gender, profilePicture } = req.body;
console.log("backend")
    User.findById(req.params.id)
    .then( user => {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.location = location;
        user.dateofBirth = dateofBirth;
        user.gender = gender;
        user.profilePicture = profilePicture;
        user.save().then(user => {
            res.json('User updated!');
        })
    })
    .catch(err => res.status(404).json({success: false})); 
});

module.exports = router;