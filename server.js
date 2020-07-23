// Imports
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').db;
const endpoints = require('./api/endpoints');

const app = express();

app.use(express.json());
// Pass API calls to endpoints.js
app.use('/api/', endpoints);

// Connect to MongoDB and listen on port

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((error) => console.log(error))
    .finally(() => app.listen(5000, () => console.log('Listening on port: 5000')));

