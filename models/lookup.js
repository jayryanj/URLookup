const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LookupSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = Lookup = mongoose.model('Lookup', LookupSchema)