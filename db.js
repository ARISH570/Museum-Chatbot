const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB connection string
const mongoURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with an error code
    }
};

module.exports = connectDB;
