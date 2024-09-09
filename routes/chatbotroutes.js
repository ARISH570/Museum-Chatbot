const express = require('express');
const router = express.Router();
const { WebhookClient } = require('dialogflow-fulfillment');

router.post('/dialogflow', (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function welcome(agent) {
        agent.add('Welcome to the museum ticketing system! How can I assist you today?');
    }

    function bookTicket(agent) {
        // Extract parameters from Dialogflow and handle booking
        const user = agent.parameters.user;
        const museum = agent.parameters.museum;
        const date = agent.parameters.date;
        const price = agent.parameters.price;
        
        // Logic for booking ticket (You might call your controller here)
        agent.add(`Booking ticket for ${museum} on ${date} for ${user}.`);
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Book Ticket', bookTicket);

    agent.handleRequest(intentMap);
});

module.exports = router;
