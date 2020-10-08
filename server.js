// Imports
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').db;
const endpoints = require('./api/endpoints');
const path = require('path');

const app = express();


app.use(express.json());

// Enables CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

// Pass API calls to endpoints.js
app.use('/api/', endpoints);

app.use(express.static(path.join(__dirname, './build')))

app.get('*', (req , res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
});

// Connect to MongoDB and listen on port
/**
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`${new Date(Date.now())} - MongoDB Connected...`))
    .catch((error) => console.log(error))
    .finally(() => app.listen(5000, () => console.log(`${new Date(Date.now())} - Listening on port: 5000`)));
*/

// Remove this once Mongo is implemented
app.listen(5000, () => console.log(`${new Date(Date.now())} - Listening on port: 5000`));

