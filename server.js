const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const meetups = require('./routes/api/meetups');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

 // Body-parser Middleware
 app.use(express.json());

 //DB Config
 const db = config.get('mongoURI');

 //MongoDB Connection
 mongoose
 .connect(db, {
     useNewUrlParser: true,
     useCreateIndex: true
 })
 .then (() => console.log('Connected to MongoDB...'))
 .catch( err => console.log(err));

 //Use Routes
 app.use('/api/meetups', meetups);
 app.use('/api/users', users);
 app.use('/api/auth', auth);

 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log('Server started on ${port}'));