// Imports
const express = require('express');
const mongoose = require('mongoose');
const controller = require('./api/controller');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();


app.use(express.json());

// Enables CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

// Pass API calls to the controller
app.use('/api/', controller);

// Remove this once Mongo is implemented
app.listen(process.env.PORT, () => console.log(`${new Date(Date.now())} - Listening on port: ${process.env.PORT}`));

