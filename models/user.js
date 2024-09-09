const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure that email addresses are unique
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
