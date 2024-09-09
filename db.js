const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb+srv://arish:arish@cluster0.i0ln9.mongodb.net/';

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
