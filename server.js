// Imports
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').db;
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((error) => console.log(error))

app.listen(5000, () => console.log('Listening on port: 5000'));