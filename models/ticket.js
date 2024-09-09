const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    user: { type:String, required: true },
    museum: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
});

module.exports = mongoose.model('Ticket', TicketSchema);
