const express = require('express');
const router = express.Router();
const ticketController = require('/controllers/ticketController');

router.post('/book', ticketController.bookTicket);
router.patch('/cancel/:id', ticketController.cancelTicket);

module.exports = router;
