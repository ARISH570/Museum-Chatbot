const mongoose = require('mongoose'); // Add this line to import mongoose

// Define the schema for the Event model
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    museumId: {
        type: Number, // Reference to a Museum model if you have one
        required: true
    }
    // Add other fields as necessary
});

// Create the Event model from the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event; // Export the model
