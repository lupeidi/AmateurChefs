const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const meetups = require('./routes/api/meetups');

const app = express();

 // Body-parser Middleware
 app.use(bodyParser.json());

 //DB Config
 const db = require('./config/keys').mongoURI;

 //MongoDB Connection
 mongoose
 .connect(db)
 .then (() => console.log('Connected to MongoDB...'))
 .catch( err => console.log(err));

 //Use Routes
 app.use('/api/meetups', meetups);

 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log('Server started on ${port}'));