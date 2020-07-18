// Imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const db = require('./config/keys').db;
