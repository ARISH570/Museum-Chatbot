const Ticket = require('/models/Ticket');

// Book a ticket
exports.bookTicket = async (req, res) => {
    try {
        const ticket = new Ticket({
            user: req.body.user,
            museum: req.body.museum,
            date: req.body.date,
            price: req.body.price,
        });
        await ticket.save();
        res.status(201).json({ message: 'Ticket booked successfully', ticket });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel a ticket
exports.cancelTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        
        ticket.status = 'cancelled';
        await ticket.save();
        res.status(200).json({ message: 'Ticket cancelled successfully', ticket });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
